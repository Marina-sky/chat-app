import { useState } from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import astronaut from "../avatars/astronaut.svg";
import ninja from "../avatars/ninja.svg";
import secretAgent from "../avatars/secretAgent.svg";

const InitialScreen = ({ onPickAvatar, onSelectColor }) => {
  const [avatar, setAvatar] = useState("");
  const [color, setColor] = useState("");

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

  function onSubmit(e) {
    e.preventDefault();
    onPickAvatar(avatar);
    onSelectColor(color);
  }

  return (
    <div>
      <h2>Pick an avatar</h2>
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
        <label for="usercolor">Choose a background color: </label>
        <input
          type="color"
          id="usercolor"
          name="usercolor"
          defaultValue="#b71c1c"
          onChange={selectColor}
        />
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
