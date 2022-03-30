const Messages = ({ messages, users }) => {
  const timestamp = Date.now()

  const formatDate = () => {
    const options = { dateStyle: 'short', timeStyle: 'short' }
    return new Intl.DateTimeFormat('hr-HR', options).format(timestamp)
  }

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
              <div className="time">{formatDate()}</div>
            </div>
            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Messages;