import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import debounce from "lodash/debounce";
import "../styles/input.scss";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const styles = {
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: "20px",
    cursor: "pointer",
  },
  emojiPicker: {
    position: "absolute",
    bottom: 90,
    right: 30,
    cssFloat: "right",
  },
};

const Input = ({ onSendMessage }) => {
  const classes = useStyles();
  const [textInputs, setTextInputs] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  function onChange(e) {
    setTextInputs(e.target.value);
    setIsTyping(true);
    handleIsTyping();
  }

  function onSubmit(e) {
    e.preventDefault();
    setTextInputs("");
    onSendMessage(textInputs);
  }

  function onShowEmojis() {
    setShowEmojis(!showEmojis);
  }

  function addEmoji(e) {
    let emoji = e.native;
    setTextInputs(textInputs + emoji);
  }

  const handleIsTyping = debounce(() => {
    // continually delays setting "isTyping" to false for 1000ms until the user has stopped typing and the delay runs out
    setIsTyping(false);
  }, 1000);

  return (
    <>
      <span className="user-typing">{isTyping && "typing..."}</span>
      <div className="Input">
        {showEmojis ? (
          <div>
            <span style={styles.emojiPicker} className="emoji-picker">
              <Picker onSelect={addEmoji} />
            </span>
            <p
              style={styles.getEmojiButton}
              onClick={onShowEmojis}
              title="Close menu"
              className="emoji-button"
            >
              {String.fromCodePoint(0x1f60a)}
            </p>
          </div>
        ) : (
          <p
            style={styles.getEmojiButton}
            onClick={onShowEmojis}
            title="Add emoji"
            className="emoji-button"
          >
            {String.fromCodePoint(0x1f60a)}
          </p>
        )}

        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            value={textInputs}
            type="text"
            placeholder="Type your message here..."
            className="Message-input"
          />
          <Button
            onClick={(e) => onSubmit(e)}
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default Input;
