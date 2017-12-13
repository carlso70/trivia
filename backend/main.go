package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/carlso70/triviacast/backend/gamemanager"
	"github.com/carlso70/triviacast/backend/routing"
	"github.com/gorilla/handlers"
)

func main() {
	fmt.Println("Launching Server")

	// GetInstance inits the gamemanager singleton
	gamemanager.GetInstance()
	router := routing.NewRouter()

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*", os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
