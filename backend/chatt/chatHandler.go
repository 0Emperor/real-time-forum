package chat

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ChatHandler(w http.ResponseWriter, r *http.Request, db *sql.DB, Clients *Clients) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		
		return
	}
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}
