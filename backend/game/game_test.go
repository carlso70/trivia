package game

import (
	"testing"

	"github.com/carlso70/triviacast/backend/user"
)

var testGameId = -99
var testUserId = -1

func TestAddMultipleUsersToGame(t *testing.T) {
	game := Init()
	for i := 0; i < 10; i++ {
		id := -1 * i
		if err := game.AddUserToGame(user.User{Id: id}); err != nil {
			t.Error("Error add user to game:", err)
		}
	}
	if len(game.Users) != 10 {
		t.Log("Users: ", game.Users)
		t.Error("User count invalid")
	}
}

func TestRemoveUserFromGame(t *testing.T) {
	game := Init()
	usr := user.User{Id: testUserId}
	if err := game.AddUserToGame(usr); err != nil {
		t.Error("Error Adding User to Game:", err)
	}
	t.Log("User count before delete:", len(game.Users))
	if err := game.RemoveUserFromGame(usr.Id); err != nil {
		t.Error("Error Removing User From Game", err)
	}
	t.Log("User count after delete:", len(game.Users))
	if len(game.Users) != 0 {
		t.Error("Invalid User Count after Delete", len(game.Users))
	}
}

func TestRunGame(t *testing.T) {
	game := Init()
	t.Log("Checking for no user exception on start game ....")
	err := game.StartGame()
	if err == nil {
		t.Error("Missed pre checks")
	}
	t.Log("Pass")
	t.Log("Adding user to game, and test startgame")
	usr := user.User{Id: testUserId}
	if err = game.AddUserToGame(usr); err != nil {
		t.Error(err)
	}
	err = game.StartGame()
	if err != nil {
		t.Error("Error starting game:", err)
	}
}

func TestLobby(t *testing.T) {
	game := Init()
	if err := game.AddUserToGame(user.User{Id: 10}); err != nil {
		t.Error(err)
	}
	game.InitGameSocket()
	// Check for default lobby mode on game create
	if game.InLobby != true {
		t.Error("Out of lobby mode")
	}
	if err := game.AddUserToGame(user.User{Id: 11}); err != nil {
		t.Error(err)
	}
	if err := game.AddUserToGame(user.User{Id: 12}); err != nil {
		t.Error(err)
	}
	if game.InLobby != true || game.RealUserCount == 3 {
		t.Error("Invalid ")
	}

	t.Log("Creating Game")
}

func TestAddChromeCastUser(t *testing.T) {
	game := Init()
	if err := game.AddUserToGame(user.User{Id: 0, Username: "cast"}); err != nil {
		t.Error("Error Adding User From Game", err)
	}
	err := game.StartGame()
	if err != nil {
		t.Error("ERROR STARTING GAME:", err)
	}
	t.Log("Pass")
	if game.RealUserCount != 0 {
		t.Error("INVALID REAL USER COUNT")
	}
}
