import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { FC, ReactNode } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    children?: ReactNode
};

export const Header:FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  return(
   <Box component='div'onClick={() => navigate('/')} sx={{width: '100%', backgroundColor: '#31202B', height: '6em'}}>
    <Typography
      fontFamily= 'Permanent Marker'
      margin='15px'
      color='CD56AB'
      className={styles.neonButton}
      variant="h4"
      component="div"
    >
      {children}
    </Typography>
    </Box> 
  );
};
