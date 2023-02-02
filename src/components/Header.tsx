import React, { FC, ReactNode } from "react";
import { NeonText } from "./common/NeonText";

interface HeaderProps {
    children?: ReactNode
};

export const Header:FC<HeaderProps> = ({ children }) => {
  return(
    
    <NeonText variant="h5">{children}</NeonText>
  );
};
