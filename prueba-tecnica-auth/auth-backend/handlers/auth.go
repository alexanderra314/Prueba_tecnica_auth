package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("mi_clave_secreta")

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	json.NewDecoder(r.Body).Decode(&creds)

	// Dummy user
	if creds.Username != "admin" || creds.Password != "1234" {
		http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: creds.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Error generando token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func ValidateToken(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Token válido"))
}
