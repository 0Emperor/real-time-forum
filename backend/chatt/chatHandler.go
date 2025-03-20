package chat

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"forum/backend/response"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ChatHandler(w http.ResponseWriter, r *http.Request, db *sql.DB, Clients *Clients) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		response.Respond("internal server error", http.StatusInternalServerError, w)
		return
	}
	username := r.Context().Value("userName").(string)
	Clients.Singal(username, "ONLINE")
	if Clients.Map[username] == nil {
		Clients.Map[username] = &Client{
			Conn: make(map[*websocket.Conn]any),
		}
	}
	Clients.Map[username].Conn[conn] = nil
	defer func() {
		delete(Clients.Map[username].Conn, conn)
		if client, ok := Clients.Map[username]; ok || len(client.Conn) == 0 {
			Clients.Singal(username, "OFFLINE")
		}
		conn.Close()
	}()
	otherClients := Clients.GetClients(username, db)
	conn.WriteJSON(otherClients)
	for {
		msg := &Message{}
		err = conn.ReadJSON(&msg)
		if err != nil {
			break
		}
		msg.SentAt = time.Now().String()
		msg.Sender = username
		fmt.Println(msg)
		if err := Clients.SendMsg(msg, db); err != "" {
			conn.WriteJSON(map[string]any{"err": err, "code": http.StatusBadRequest})
		}
	}
}
