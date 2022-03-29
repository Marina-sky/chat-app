import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Input = ({ onSendMessage }) => {
  const classes = useStyles();
  const [textInputs, setTextInputs] = useState("");

  function onChange(e) {
    setTextInputs(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setTextInputs("");
    onSendMessage(textInputs);
  }

  function addEmoji(e) {
    let emoji = e.native;
    setTextInputs(textInputs + emoji)
  }

  return (
    <div className="Input">
      <span>
        <Picker onSelect={addEmoji} />
      </span>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={textInputs}
          type="text"
          placeholder="Type your message here..."
        />
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
      </form>
    </div>
  );
};

export default Input;