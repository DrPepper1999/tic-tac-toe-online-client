import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

interface GachiManProps {
    src: string
    side: 'left' | 'right'
    width: string,
    height: string
}

export const GachiMan = ({src, side, width, height}: GachiManProps) => {
    const matches = useMediaQuery('(min-width:1285px)');
    const isDelete = useMediaQuery('(min-width:1080px)');
    const style:React.CSSProperties = side=='left' ?
    {position: 'absolute',  left: matches ? '150px' : '50px', marginTop: '40px'}
    : {position: 'absolute', right: matches ? '150px' : '50px', marginTop: '40px'}
  return (
    isDelete ?
    <img
      style={style}
      width={width}
      height={height}
      src={src}
    />
    : null
  );
};
