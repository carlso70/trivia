package routing

import (
	"net/http"

	"github.com/carlso70/trivia/backend/handlers"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"CreateGame",
		"POST",
		"/creategame",
		handlers.CreateGame,
	},
	Route{
		"StartGame",
		"POST",
		"/startgame",
		handlers.StartGame,
	},
	Route{
		"ListUsers",
		"GET",
		"/listusers",
		handlers.ListUsers,
	},
	Route{
		"ListGames",
		"GET",
		"/listgames",
		handlers.ListGames,
	},
	Route{
		"JoinGame",
		"POST",
		"/joingame",
		handlers.JoinGame,
	},
	Route{
		"CreateUser",
		"POST",
		"/createuser",
		handlers.CreateUser,
	},
	Route{
		"LoginUser",
		"POST",
		"/loginuser",
		handlers.LoginUser,
	},
	Route{
		"HighScores",
		"GET",
		"/highscores",
		handlers.GetHighScores,
	},
	Route{
		"ChangePassword",
		"POST",
		"/changepassword",
		handlers.ChangePassword,
	},
	Route{
		"LeaveGame",
		"POST",
		"/leavegame",
		handlers.LeaveGame,
	},
	Route{
		"UploadAvatar",
		"POST",
		"/uploadavatar",
		handlers.UploadAvatar,
	},
	Route{
		"SetSecurityQuestion",
		"POST",
		"/setsecurityquestion",
		handlers.SetSecurityQuestion,
	},
	Route{
		"AnswerSecurityQuestion",
		"POST",
		"/answersecurityquestion",
		handlers.AnswerQuestion,
	},
	Route{
		"GetSecurityQuestion",
		"POST",
		"/getsecurityquestion",
		handlers.GetSecurityQuestion,
	},
}
