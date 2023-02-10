import React, { FC } from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import style from "./Card.module.css";

interface CardProps {
    title: string,
    url: string,
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

export const Card:FC<CardProps> = ({title, url, onClickHandler}) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const clrNeon = "hsl(317 100% 54%)";
  const clrBg = "hsl(323 21% 16%)";
  const StyledTypography = styled((props: any) => (
    <Typography
      className={style.neonButton}
      sx={{
        color: isMouseEnter ? clrBg : clrNeon,
        boxShadow: isMouseEnter ? `0 0 2em 0.5em ${clrNeon}` : "",
        backgroundColor: isMouseEnter ? clrNeon : ''
      }}
      gutterBottom
      variant="h5"
      component="div"
    >
      {props.children}
    </Typography>
  ))(({ theme }) => ({
    border: "2px solid black",
  }));

  return (
    <MuiCard
      sx={{ maxWidth: 345, width: 250, backgroundColor: "hsl(323 21% 16%)" }}
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
    >
      <CardActionArea onClick={onClickHandler}>
        <CardMedia
          component="img"
          height="140"
          image={url}
          alt="green iguana"
        />
        <CardContent>
          <StyledTypography>{title}</StyledTypography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};
