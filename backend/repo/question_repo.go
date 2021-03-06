package repo

import (
	"fmt"

	"github.com/carlso70/trivia/backend/question"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func GenerateQuestionDeck(difficulty string, ct int) []question.Question {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		fmt.Println("ERROR GENERATING QUESTION_DECK:", err)
		return []question.Question{}
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Questions)
	result := []question.Question{}
	err = c.Find(bson.M{"difficulty": difficulty}).Limit(ct).All(&result)
	if err != nil {
		panic(err)
	}
	return result
}
