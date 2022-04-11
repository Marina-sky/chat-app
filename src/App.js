import { useState, useEffect } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import InitialScreen from "./components/InitialScreen";
import nouns from "./data/nouns";
import adjectives from "./data/adjectives";
import "./styles/App.css";

function randomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function App() {
  let selectedAvatar = "";
  const [user, setUser] = useState({
    username: "",
    userColor: "",
  });
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [users, setUsers] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const drone = new window.Scaledrone("Brk2ThFSipDFaXav", {
      data: user,
    });
    setDrone(drone);
    // eslint-disable-next-line
  }, []);
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

        const username = user.username;
        const chatUserID = chatUser.id;
        const userColor = user.userColor;
        const userAvatar = selectedAvatar;
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

  const onSendMessage = (message) => {
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  const onTypeUsername = (userName) => {
    if (userName !== "") {
      user.username = userName;
    } else {
      user.username = randomName();
    }
  };

  const onPickAvatar = (avatar) => {
    if (avatar) {
      setLoggedIn(true);
      selectedAvatar = avatar;
    }
  };

  const onSelectColor = (color) => {
    if (color) {
      user.userColor = color;
    } else {
      user.userColor = randomColor();
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
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
