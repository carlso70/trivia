package gamemanager

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/carlso70/trivia/backend/repo"
	"github.com/carlso70/trivia/backend/user"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// TODO change the question db, to change Answer an int
type SocketResponse struct {
	UserId int    `json:"userId"`
	GameId int    `json:"gameId"`
	Answer string `json:"answer"`
}

type Client struct {
	Connection *websocket.Conn
	User       user.User
}

var clients []Client

func AcceptGameSockets(w http.ResponseWriter, r *http.Request) {
	var socketRep SocketResponse

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	_, message, err := conn.ReadMessage()

	// Convert first socket message to get setup client
	err = json.Unmarshal(message, &socketRep)
	if err != nil {
		fmt.Println("Error Unmarshaling json:", err)
		return
	}
	usr, err := repo.FindUser(socketRep.UserId)

	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Invalid JSON format"))
		fmt.Println(err)
		return
	}

	client := Client{Connection: conn, User: usr}
	clients = append(clients, client)
	fmt.Println("Client Subscribed")

	go Listen(client)
}

func Listen(client Client) {
	defer client.Connection.Close()
	// TODO check if the user already sent message to the current answer queue
	for {
		_, message, err := client.Connection.ReadMessage()

		if err != nil {
			fmt.Println("read:", err)
			break
		}
		fmt.Println("Recv:", message)
		time.Sleep(1 * time.Second)
	}
}

func SendMsg(msg string) {
	fmt.Println("Broadcasting to: ", len(clients))
	for i := len(clients) - 1; i >= 0; i-- {
		if err := clients[i].Connection.WriteMessage(websocket.TextMessage, []byte(msg)); err != nil {
			// if there is an error remove client
			clients = append(clients[:i], clients[i+1:]...)
			// TODO remove the user from the game as well if there is a disconnect
		}
	}
}

func InitWebSocket() {
	clients = make([]Client, 0)
	http.HandleFunc("/game_socket", AcceptGameSockets)
	http.ListenAndServe(":3000", nil)
}
