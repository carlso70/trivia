package gamemanager

import (
	"errors"
	"fmt"
	"sync"
	"time"

	"github.com/carlso70/trivia/backend/game"
	"github.com/carlso70/trivia/backend/repo"
	"github.com/carlso70/trivia/backend/user"
)

type GameManager struct {
	Games []*game.Game
}

var instance *GameManager
var once sync.Once

// GetInstance gets the current singleton instance if it exists, if not returns an empty instance
func GetInstance() *GameManager {
	once.Do(func() {
		games := make([]*game.Game, 0)
		instance = &GameManager{Games: games}
		go instance.Cleaner()
	})
	return instance
}

func (g *GameManager) deleteDoneGames() {
	for i := 0; i < len(g.Games); i++ {
		// Delete the game
		if g.Games[i].GameOver {
			fmt.Println("Deleting Done Game:", g.Games[i].Id)
			g.Games = append(g.Games[:i], g.Games[i+1:]...)
		}
	}
}

// Cleaner sweeps all the games and removes the ones that are over
func (g *GameManager) Cleaner() {
	for {
		<-time.After(time.Millisecond)
		go g.deleteDoneGames()
	}
}

// CreateGame adds a game to the GameServer
func (g *GameManager) CreateGame(difficulty int, questionCt int, userId int) (*game.Game, error) {
	// Create game instance
	newGame := game.Init()
	newGame.GameDifficulty = difficulty
	newGame.QuestionCt = questionCt
	newGame.QuestionDeck = newGame.BuildQuestionDeck()
	if len(newGame.QuestionDeck) > 0 {
		newGame.CurrentQuestion = newGame.QuestionDeck[0]
	}

	// Find the user in the db, then add the user to the game
	usr, err := repo.FindUser(userId)
	if err != nil {
		panic(err)
	}

	// Add the new user to the game
	/*
		if err := newGame.AddUserToGame(usr); err != nil {
			panic(err)
		}
	*/

	g.Users = append(g.Users, user)
	g.RealUserCount += 1

	// Set the game host to the creator
	newGame.Host = usr.Username

	// Start open the websocket to connect to the game
	newGame.InitGameSocket()

	// Add game to list of games
	g.Games = append(g.Games, newGame)
	// Return the games Id, and error if it exists
	return newGame, nil
}

// StartGame launches a game that was created
func (g *GameManager) StartGame(id int) error {
	gm, err := findGame(g.Games, id)
	if err != nil {
		return err
	}
	gm.StartGame()
	return nil
}

// GetUsers gets all the users in the DB and returns them
func (g *GameManager) GetUsers() ([]user.User, error) {

	userlist, err := repo.GetUsers()
	if err != nil {
		panic(err)
	}
	return userlist, err
}

func (g *GameManager) GetGames() []*game.Game {
	return g.Games
}

// AddUserToGame searchs to see if game exists, then finds the user with the id
// and adds them to the game
func (g *GameManager) AddUserToGame(gameId, userId int) (*game.Game, error) {
	// Search for game instance
	gm, err := findGame(g.Games, gameId)
	if err != nil {
		panic(err)
	}
	user, err := repo.FindUser(userId)
	if err != nil {
		panic(err)
	}
	if err = gm.AddUserToGame(user); err != nil {
		panic(err)
	}
	// Join Game instance
	return gm, nil
}

// AddUserToGame searchs to see if game exists, then finds the user with the id
// and adds them to the game
func (g *GameManager) RemoveUserFromGame(gameId, userId int) (*game.Game, error) {
	// Search for game instance
	gm, err := findGame(g.Games, gameId)
	if err != nil {
		panic(err)
	}

	if err = gm.RemoveUserFromGame(userId); err != nil {
		panic(err)
	}

	// Join Game instance
	return gm, nil
}

func (g *GameManager) DeleteGame(gameId int) error {
	// Search for game

	// Delete
	return nil
}

// findGame searchs existing games, and returns the index of to the game if it exists
func findGame(games []*game.Game, gameId int) (*game.Game, error) {
	for _, gm := range games {
		if gm.Id == gameId {
			return gm, nil
		}
	}

	return nil, errors.New("Game not found error")
}
