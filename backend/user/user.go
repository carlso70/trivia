package user

import (
	"github.com/carlso70/trivia/backend/utils"
)

// SessionId is the current gameId
type User struct {
	Id                     int    `json:"id" bson:"id"`
	Username               string `json:"username" bson:"username"`
	Password               string `json:"-" bson:"password"`
	SecurityQuestion       string `json:"securityQuestion" bson:"securityQuestion"`
	SecurityQuestionAnswer string `json:"-" bson:"securityQuestionAnswer"`
	GameId                 int    `json:"gameID" bson:"gameId"`
	Score                  int    `json:"score" bson:"score"`
	Active                 bool   `json:"active" bson:"active"`
	WinCt                  int    `json:"wins" bson:"wins"`
	AvatarLink             string `json:"avatarUrl" bson:"avatarUrl"`
}

func Init() User {
	id := utils.GenerateId()
	active := true
	return User{Id: id, Active: active, AvatarLink: utils.DefaultAvatarUrl()}
}

func CreateUser(id int, username string, password string, gameId int, score int, active bool) User {
	return User{
		Id:         id,
		Username:   username,
		Password:   password,
		GameId:     gameId,
		Score:      score,
		Active:     active,
		AvatarLink: utils.DefaultAvatarUrl(),
	}
}
