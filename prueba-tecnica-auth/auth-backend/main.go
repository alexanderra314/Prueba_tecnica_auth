package main

import (
	"auth-backend/handlers"
	"auth-backend/middleware"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// Aplicar el middleware de CORS a todas las rutas
	r.Use(middleware.CORSMiddleware)

	r.HandleFunc("/login", handlers.Login).Methods("POST", "OPTIONS")
	r.Handle("/validate", middleware.JWTMiddleware(http.HandlerFunc(handlers.ValidateToken))).Methods("GET", "OPTIONS")

	log.Println("Servidor corriendo en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
