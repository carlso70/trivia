package repo

import (
	"fmt"
	"testing"

	"github.com/carlso70/trivia/backend/user"
)

var testId = -1

/*
func AddCastUserToDB(t *testing.T) {
	cast := user.User{Id: 21, Username: "cast", GameId: 0}
	if err := AddUserToDB(cast); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
}
*/

func TestAddUserToDB(t *testing.T) {
	// Create dummy user
	if err := AddUserToDB(user.User{Id: testId, Username: "Cold Tuna", Score: 150}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
}

func TestFindUser(t *testing.T) {
	// Create a test user with an Id only tests will have
	userTest := user.Init()
	userTest.Id = testId
	err := AddUserToDB(userTest)
	if err != nil {
		t.Errorf("Error in AddUserToDB: %s", err)
	}
	user, err := FindUser(userTest.Id)
	if user.Id != userTest.Id {
		t.Log("Want user with Id:", userTest.Id, "got:", user.Id)
		t.Error("Error Recieved: ", err)
	}
}

func TestGetAllUser(t *testing.T) {
	users, err := GetUsers()
	t.Log("Users count:", len(users))
	if err != nil && len(users) > 0 {
		t.Errorf("Error Recieved:", err)
	}
}

func TestUpdateUserPassword(t *testing.T) {
	passId := -45
	user := user.Init()
	user.Id = passId
	user.Password = "OldPassword"
	err := AddUserToDB(user)
	if err != nil {
		t.Errorf("Error in AddUserToDB: %s", err)
	}
	testUsr, err := FindUser(passId)
	if testUsr.Password != user.Password {
		t.Errorf("Error finding user, not matching passwords")
	}
	user.Password = "NewPassword"
	UpdateUserPassword(user)
	testUsr, err = FindUser(user.Id)
	if testUsr.Password != user.Password {
		t.Errorf("Error not matching passwords after update on find")
	}

	err = DeleteUser(passId)
	if err != nil {
		t.Errorf("Error Recieved: ", err)
	}
}

func TestUpdateUser(t *testing.T) {
	upId := -4000
	user := user.Init()
	user.Id = upId
	user.Password = "OLDOLDOLDOLDUSERNAME"
	err := AddUserToDB(user)
	user, err = FindUser(upId)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	user.Username = "Test"
	err = UpdateUser(user)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	user2, err := FindUser(user.Id)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	fmt.Println("USERNAME 1", user.Username, "USERNAME2", user2.Username)
	if user2.Username != user.Username {
		t.Error("Update failed")
	}

	err = DeleteUser(upId)
	if err != nil {
		t.Errorf("Error Recieved: ", err)
	}
}

func TestDeleteUser(t *testing.T) {
	t.Run("Add Test User", TestAddUserToDB)
	err := DeleteUser(testId)
	if err != nil {
		t.Errorf("Error Recieved: ", err)
	}
}

func TestGenerateQuestionDeck(t *testing.T) {
	deck := GenerateQuestionDeck("Easy", 10)
	if len(deck) != 10 {
		t
		t.Errorf("Error Deck Length, Wanted %d : Recieved %d", 10, len(deck))
	}
}

func TestUpdateUserSecurityQuestion(t *testing.T) {
	upId := -4000
	user := user.Init()
	user.Id = upId
	user.Username = "Testing"
	user.SecurityQuestion = "OLDOLDOLDOLD"
	err := AddUserToDB(user)
	user, err = FindUser(upId)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	user.SecurityQuestion = "NEWNEWNEWN"
	err = UpdateUser(user)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	user2, err := FindUser(user.Id)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	fmt.Println("USERNAME 1", user.SecurityQuestion, "USERNAME2", user2.SecurityQuestion)
	if user2.Username != user.Username {
		t.Error("Update failed")
	}

	err = DeleteUser(upId)
	if err != nil {
		t.Errorf("Error Recieved: ", err)
	}
}
