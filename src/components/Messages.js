import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "../styles/Messages.css";

const Messages = ({ messages, users }) => {
  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <SimpleBar style={{ maxHeight: 500 }}>
        <ul className="Messages-list">
          {messages.map((message) => (
            <div
              key={messages.indexOf(message)}
              className={
                message.chatUserID === users
                  ? "Messages-message"
                  : "Messages-message currentMember"
              }
            >
              <span
                className="avatar"
                style={{
                  backgroundColor: `${message.userColor}`,
                  backgroundImage: `URL("${message.userAvatar}")`,
                }}
              ></span>
              <div className="Message-content">
                <div className="username">{message.username}</div>
                <div className="text">{message.text}</div>
                <div className="time">
                  {message.timestamp.getHours()}:
                  {message.timestamp.getMinutes() < 10
                    ? `0${message.timestamp.getMinutes()}`
                    : message.timestamp.getMinutes()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </SimpleBar>
    </div>
  );
};

export default Messages;
