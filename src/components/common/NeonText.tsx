import React, { ReactNode } from 'react'
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TypographyCustomization = styled(Typography)(({ theme }) => ({
    fontFamily: "Permanent Marker",
    margin: theme.spacing(3, 0, 2),
    textAligan: "center",
    fontSize: "40px",
    color: "deeppink",
    textShadow: "1px 1px darkmagenta",
  }));


interface NeonTextProps {
    children: ReactNode
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "inherit" | undefined
} 

export const NeonText:React.FC<NeonTextProps> = ({children, variant}) => {
  return (<TypographyCustomization variant={variant} alignItems="baseline">{children}</TypographyCustomization>)
}