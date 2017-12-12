package game

import (
	"fmt"
	"net/http"
)

// Creates a socket server for each game that users can connect to
func (g *Game) InitGameSocket() {
	// Initialize a socket hub that manages incoming messages
	hub := newHub()
	g.hub = hub
	hub.currentGame = g
	go g.hub.run()

	handle := fmt.Sprintf("/game_socket/%d", g.Id)
	http.HandleFunc(handle, func(w http.ResponseWriter, r *http.Request) {
		serveWs(g.hub, w, r)
	})
	fmt.Println("Serving on:", handle)
	go http.ListenAndServe(":3000", nil)
}
