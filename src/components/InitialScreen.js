import { useState } from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import astronaut from "../avatars/astronaut.svg";
import ninja from "../avatars/ninja.svg";
import secretAgent from "../avatars/secretAgent.svg";

const InitialScreen = ({ onPickAvatar }) => {
  const [avatar, setAvatar] = useState();

  function onClickAvatar(e) {
    setAvatar(e.target.src);
    document.querySelectorAll("img").forEach((item) => {
      item.classList.remove("selected");
    });
    e.target.classList.add("selected");
  }

  function onSubmit(e) {
    e.preventDefault();
    onPickAvatar(avatar);
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
