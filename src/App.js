import { useState, useEffect } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import InitialScreen from "./components/InitialScreen";
import nouns from "./data/nouns";
import adjectives from "./data/adjectives";
import "./styles/app.scss";

function randomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function App() {
  const [user, setUser] = useState({
    username: "",
    userColor: "",
    avatar: ""
  });
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [users, setUsers] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user.username && user.avatar) {
      const drone = new window.Scaledrone("Brk2ThFSipDFaXav", {
      data: user,
      });
      setDrone(drone);
    }
  }, [user]);

  useEffect(() => {
    if (drone) {
      drone.on("open", (error) => {
        if (error) {
          console.log("Error on connecting", error);
        }

        const chatRoom = drone.subscribe("observable-room");

        chatRoom.on("open", (error) => {
          if (error) {
            return console.error(error);
          }
          // Connected to room
        });

        chatRoom.on("data", (text, chatUser) => {
          setUsers(drone.clientId);

          const user = chatUser.clientData;
          const username = user.username;
          const chatUserID = chatUser.id;
          const userColor = user.userColor;
          const userAvatar = user.avatar;
          const timestamp = new Date();
          setMessages((oldArray) => [
            ...oldArray,
            {
              text,
              username,
              userColor,
              userAvatar,
              chatUserID,
              user,
              timestamp,
            },
          ]);
        });
      });
    }
  }, [drone]);

  const onSendMessage = (message) => {
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  const onTypeUsername = (userName) => {
    setUser((user) => ({ ...user, username: userName || randomName() }));
  };

  const onPickAvatar = (avatar) => {
    if (avatar) {
      setLoggedIn(true);
      setUser((user) => ({ ...user, avatar}));
    }
  };

  const onSelectColor = (color) => {
    setUser((user) => ({ ...user, userColor: color || randomColor() }));
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chat Space</h1>
      </div>
      {loggedIn ? (
        <div>
          <Messages messages={messages} users={users} />
          <Input onSendMessage={onSendMessage} />
        </div>
      ) : (
        <InitialScreen
          onTypeUsername={onTypeUsername}
          onPickAvatar={onPickAvatar}
          onSelectColor={onSelectColor}
        />
      )}
    </div>
  );
}

export default App;
