import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

interface MyBackdropProps {
    isLoading: boolean,
}

export const MyBackdrop = ({isLoading} : MyBackdropProps) => {
  return (
    <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}
