const Messages = ({ messages, users }) => {
  return (
    <div>
      <ul className="Messages-list">
        {messages.map((message) => (
          <div key={messages.indexOf(message)} className={(message.chatUserID === users)
            ? "Messages-message"
            : "Messages-message currentMember"}>
            <span
              className="avatar"
              style={{ backgroundColor: `${message.userColor}` }}
            />
            <div className="Message-content">
              <div className="username">{message.username}</div>
              <div className="text">{message.text}</div>
              <div className="time">{message.timestamp.getHours()}:
              {(message.timestamp.getMinutes()) < 10 ? `0${message.timestamp.getMinutes()}` : message.timestamp.getMinutes()}
              </div>
            </div>
            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Messages;