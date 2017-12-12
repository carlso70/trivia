package question

import (
	"fmt"
)

type Question struct {
	Question   string   `json:"question" bson:"question"`
	Choices    []string `json:"choices" bson:"choices"`
	Answer     string   `json:"answer" bson:"answer"`
	Difficulty string   `json:"difficulty" bson:"difficulty"`
	Category   string   `json:"category" bson:"category"`
}

func GetDefaultQuestions() []Question {
	deck := make([]Question, 0)
	ques1 := Question{
		Question:   "Do you like trivia",
		Choices:    []string{"Yes", "No", "I'm not sure"},
		Answer:     "Yes",
		Difficulty: "Easy",
		Category:   "Default",
	}
	ques2 := Question{
		Question:   "Do you like Purdue",
		Choices:    []string{"Yes", "No", "I'm not sure"},
		Answer:     "Yes",
		Difficulty: "Easy",
		Category:   "Default",
	}
	deck = append(deck, ques1, ques2)
	return deck
}

func ConvertDifficulty(dif int) string {
	switch dif {
	case 0:
		return "Easy"
	case 1:
		return "Medium"
	case 2:
		return "Hard"
	default:
		fmt.Errorf("INVALID DIFFICULTY CONVERSION:%d", dif)
		return "Easy"
	}
}

func ConvertDifficultyToValue(dif string) int {
	switch dif {
	case "Easy":
		return 1
	case "Medium":
		return 2
	case "Hard":
		return 3
	default:
		fmt.Errorf("INVALID DIFFICULTY CONVERSION:%s", dif)
		return 1
	}
}
