import { useState } from "react";
import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import astronaut from "../avatars/astronaut.svg";
import ninja from "../avatars/ninja.svg";
import secretAgent from "../avatars/secretAgent.svg";
import "../styles/InitialScreen.css";

const InitialScreen = ({ onTypeUsername, onPickAvatar, onSelectColor }) => {
  const [avatar, setAvatar] = useState("");
  const [color, setColor] = useState("");
  const [userName, setUserName] = useState("");

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#f50057",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
    },
  });

  function onClickAvatar(e) {
    setAvatar(e.target.src);
    document.querySelectorAll("img").forEach((item) => {
      item.classList.remove("selected");
    });
    e.target.classList.add("selected");
  }

  function selectColor(e) {
    setColor(e.target.value);
  }

  function typeUsername(e) {
    setUserName(e.target.value.trim());
  }

  function onSubmit(e) {
    e.preventDefault();
    onTypeUsername(userName);
    onPickAvatar(avatar);
    onSelectColor(color);
  }

  return (
    <div>
      <h2>First type your chat name and pick an avatar</h2>
      <div className="username-input">
        <CssTextField
          id="custom-css-outlined-input1"
          label="Your chat name"
          variant="outlined"
          value={userName}
          onChange={typeUsername}
          autoComplete="off"
          autoFocus={true}
        />
      </div>
      <p className="choose-avatar">Choose one from existing avatars</p>
      <div className="avatars">
        <img src={astronaut} id="astronaut" alt="" onClick={onClickAvatar} />
        <img src={ninja} id="ninja" alt="" onClick={onClickAvatar} />
        <img
          src={secretAgent}
          id="secretAgent"
          alt=""
          onClick={onClickAvatar}
        />
      </div>
      <div className="color-input">
        <label htmlFor="usercolor">Choose a background color: </label>
        <input
          type="color"
          id="usercolor"
          defaultValue="#006064"
          onChange={selectColor}
        />
      </div>
      <div className="footer">
        <small>
          Chat name and background color are optional. If you skip them, you
          will get a randomly generated chat name and color.
        </small>
      </div>
      <Box textAlign="center">
        <Button
          onClick={(e) => onSubmit(e)}
          variant="contained"
          color="secondary"
        >
          OK
        </Button>
      </Box>
    </div>
  );
};

export default InitialScreen;
