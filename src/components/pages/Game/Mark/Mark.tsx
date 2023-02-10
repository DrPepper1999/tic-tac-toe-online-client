import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { IconButton, Typography } from "@mui/material";
import { useMakeMove } from "../../../../app/hooks/useMakeMove";
import { Mark as IMark } from "../../../../models/player";
import styles from "./Mark.module.css";

interface MarkProps {
  x: number;
  y: number;
  mark: IMark;
}

export const Mark = ({ x, y, mark }: MarkProps) => {
  const makeMove = useMakeMove(x, y);

  const [focus, setFocus] = useState(false);

  const onClickHandler = async () => {
    if (makeMove != undefined) await makeMove();

    // if (user.playerTurn && room.map[props.x][props.y] == "Empty") {
    //     await sendMove(connection, props.x, props.y, room.id, user.id)
    //     .then(value => {
    //         dispatch(makeMove({x: props.x, y: props.y}));
    //     });
    //   }
  };

  const getMarkIcon = () => {
    switch (mark) {
      case "Circle":
        return (
          <Typography
            sx={{
              fontSize: "300%",
              color: "hsl(317 100% 54%)",
              textShadow: "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
            }}
          >
            O
          </Typography>
          //   <PanoramaFishEyeIcon
          //     className={styles.neonButton}
          //     sx={{ width: "100%", height: "100%" }}
          //   />
        );
      case "Cross":
        return (
          <Typography
            sx={{
              fontSize: "300%",
              color: "hsl(317 100% 54%)",
              textShadow: "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
            }}
          >
            X
          </Typography>
          //   <CloseIcon
          //     className={styles.neonButton}
          //     sx={{ width: "100%", height: "100%" }}
          //   />
        );
      case "Empty":
        return (
            <Typography
            marginBottom='40px'
            sx={{
              fontSize: "300%",
              color: "hsl(317 100% 54%)",
              textShadow: "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
            }}
          >
            .
          </Typography>
        //   <CheckBoxOutlineBlankIcon
        //     className={styles.neonButton}
        //     sx={{
        //       width: "100%",
        //       height: "100%",
        //       "& svg path": {
        //         textShadow:
        //           "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor",
        //       },
        //     }}
        //   />
         );
    }

    throw "Неверное значение mark " + mark;
  };

  return (
    <IconButton
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      onClick={onClickHandler}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {getMarkIcon()}
    </IconButton>
  );
};
