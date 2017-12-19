package game

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/carlso70/trivia/backend/question"
	"github.com/carlso70/trivia/backend/repo"
	"github.com/carlso70/trivia/backend/user"
	"github.com/carlso70/trivia/backend/utils"
)

type QuestionResponse struct {
	Username string `json:"username"`
	Answer   string `json:"answer"`
}

type Game struct {
	Id              int                 `json:"id"`
	Users           []user.User         `json:"users"`
	QuestionDeck    []question.Question `json:"-"`
	CurrentQuestion question.Question   `json:"question"`
	Scoreboard      map[string]int      `json:"scoreboard"`
	QuestionNumber  int                 `json:"questionNumber"`
	AskingQuestion  bool                `json:"askingQuestion"`
	QuestionCt      int                 `json:"questionCt"`
	GameDifficulty  int                 `json:"difficulty"`
	Host            string              `json:"host"`
	Winner          string              `json:"-"`
	RealUserCount   int                 `json:"-"`
	responses       chan string         `json:"-"`
	GameOver        bool                `json:"gameOver"`
	InLobby         bool                `json:"inLobby"`
	hub             *Hub                `json:"-"`
}

const (
	QUESTION_LENGTH = 30 * time.Second // In Seconds
)

func Init() *Game {
	id := utils.GenerateId()
	scoreboard := make(map[string]int)
	responses := make(chan string)
	deck := question.GetDefaultQuestions()
	// Default QuestionCt = 10, GameDif = 1
	return &Game{
		Id:             id,
		Users:          nil,
		QuestionDeck:   deck,
		Scoreboard:     scoreboard,
		responses:      responses,
		Host:           "",
		GameDifficulty: 1,
		QuestionCt:     10,
		GameOver:       false,
		InLobby:        true,
	}
}

func (g *Game) StartGame() error {
	fmt.Println("USERS ")
	fmt.Println(g.Users)

	// do initial testing
	if len(g.Users) <= 0 {
		fmt.Println("0 USERS IN GAME ", g.Id)
		return errors.New("No user exception, can't start game")
	}

	// Go Out of Lobby Mode
	g.InLobby = false

	go g.runGame()
	return nil
}

// Runs a game instance, which contains the basic game logic
func (g *Game) runGame() {
	fmt.Println("Running game:", g.Id)

	// Index to current question being display
	g.QuestionNumber = 1

	// Keep ask
	for g.QuestionNumber-1 < g.QuestionCt {
		if g.RealUserCount == 0 {
			fmt.Println("Ending game")
			g.endGame()
			return
		}
		// Start a question, which delays for 30 seconds while listening for answers
		if err := g.startQuestion(g.QuestionDeck[g.QuestionNumber-1]); err != nil {
			log.Panic(err)
		}
		g.QuestionNumber += 1
	}

	g.endGame()
}

// startQuestion starts a timer, and broadcasts the question while waiting for the game channel to fill or timer to expire
func (g *Game) startQuestion(q question.Question) error {
	g.CurrentQuestion = q
	g.AskingQuestion = true

	// Send a message of the current game
	gameJson, _ := json.Marshal(g)
	g.hub.broadcast <- []byte(gameJson)

	// start timer, and tick chan
	fmt.Printf("Starting question %s...\n", q.Question)

	answers := make([]QuestionResponse, 0)

	timerChan := time.NewTimer(QUESTION_LENGTH).C
	done := make(chan bool)
	go func() {
		for g.AskingQuestion {
			select {
			case c := <-g.responses:
				var answer QuestionResponse
				fmt.Println("RECIEVED RESPONSE:", c)
				err := json.Unmarshal([]byte(c), &answer)
				if err == nil {
					// if there is no err with the response add it to the current answer array
					if alreadyAnswered(answers, answer) == false {
						answers = append(answers, answer)
					}
					if len(answers) == g.RealUserCount {
						g.AskingQuestion = false
					}
				} else {
					fmt.Println("Error Marshaling question response", err)
				}
			case <-timerChan:
				fmt.Println("TIMER EXPIRED")
				g.AskingQuestion = false
			default:
			}
		}
		done <- true
	}()

	// wait for goroutine to finish
	<-done

	fmt.Println("Finishing Question")
	// Check if the question responses match the answer
	for _, resp := range answers {
		if resp.Answer == g.CurrentQuestion.Answer {
			g.Scoreboard[resp.Username] += question.ConvertDifficultyToValue(g.CurrentQuestion.Difficulty) * 10
		}
	}
	return nil
}

// DetermineWinnerAndScoreboard goes through the games scoreboard and determines the game's winner
func (g *Game) DetermineWinnerAndScoreboard() {
	max := -1
	for key, value := range g.Scoreboard {
		if value > max {
			max = value
			g.Winner = key
		}
	}
}

// EndGame updates players all time score at the end of the game
func (g *Game) endGame() {
	fmt.Println("Ending game....")

	// Updates the users win count
	for i := 0; i < len(g.Users); i++ {
		// If the user is a cast user ignore
		if g.Users[i].Username == "cast" {
			continue
		}
		g.Users[i].Score += g.Scoreboard[g.Users[i].Username]
		if g.Users[i].Username == g.Winner {
			g.Users[i].WinCt += 1
			// Update the user in the db
		}
		if err := repo.UpdateUser(g.Users[i]); err != nil {
			fmt.Print("ERROR UPDATING USER AFTER GAME", err)
		}
	}

	g.GameOver = true
	if len(g.Users) > 0 {
		// Send a message of the current game
		gameJson, _ := json.Marshal(g)
		g.hub.broadcast <- []byte(gameJson)
	}
}

// AddUserToGame checks if the user is in the game, if it is then append to game slice
func (g *Game) AddUserToGame(user user.User) error {
	for _, usr := range g.Users {
		if usr.Id == user.Id {
			return errors.New("Error: User already in game")
		}
	}

	// Set the id of the users gameId to the id of the game
	user.GameId = g.Id
	// Dereference the user point and append it to current game slice
	g.Users = append(g.Users, user)

	// Test users have IDs less than 0 and we don't want to broadcast messages to them
	if user.Id <= 0 {
		return nil
	}

	// Check if its a chromecast, which just watches the game
	if user.Username != "cast" {
		g.RealUserCount += 1
		// Add them to the scoreboard
		g.Scoreboard[user.Username] = 0
	}

	fmt.Println("Adding user:", user.Username, "to game:", g.Id)
	// Broadcast new user
	gameJson, _ := json.Marshal(g)
	g.hub.broadcast <- []byte(gameJson)
	return nil
}

// RemoveUserFromGame will remove a specific user from the game if it is exists
func (g *Game) RemoveUserFromGame(id int) error {
	for key, usr := range g.Users {
		if usr.Id == id {
			// if the user is the game, remove
			fmt.Println("Removing User:", usr.Username, "from game:", g.Id)
			g.Users = append(g.Users[:key], g.Users[key+1:]...)
			// Set the game to be deleted if the user count == 0
			if len(g.Users) == 0 {
				g.GameOver = true
			}
			return nil
		}
	}

	return errors.New("Error: Failure to delete, user not in game")
}

func (g *Game) BuildQuestionDeck() []question.Question {
	dif := question.ConvertDifficulty(g.GameDifficulty) // convert the int value to a difficulty string
	return repo.GenerateQuestionDeck(dif, g.QuestionCt)
}

// alreadyAnswered is a utility function to check if a user has already entered a response
func alreadyAnswered(answers []QuestionResponse, answer QuestionResponse) bool {
	for _, a := range answers {
		if a.Username == answer.Username {
			return true
		}
	}
	return false
}
