import Typography from '@mui/material/Typography'
import React from 'react'

interface ErrorMessageProps {
    errRef: React.RefObject<HTMLSpanElement>,
    errMsgs: Array<string>
};

export const ErrorMessage = ({errRef, errMsgs}: ErrorMessageProps) => {
  return (
    <>
    {errMsgs ? (
        <Typography variant="h6" gutterBottom ref={errRef} color="red">
          {errMsgs.map(errMsg => (
            <span>{errMsg}</span>
          ))}
        </Typography>
      ) : null}
    </>
  )
}
