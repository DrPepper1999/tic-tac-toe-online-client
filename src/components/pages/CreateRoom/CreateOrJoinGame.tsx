import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import React from 'react'

interface CreateOrJoinGameProps {
    selectedValue: string,
    setSelectedValue: (e:string) => void 
}

export const CreateOrJoinGame = ({selectedValue, setSelectedValue}: CreateOrJoinGameProps) => {
    const dispatch = useAppDispatch();
    const roomName = useAppSelector((state) => state.room.name);
    const roomId = useAppSelector((state) => state.room.id);


    const handleChange = (event:any) => {
      const value = event.target.value;
      setSelectedValue(value);
    };
  return (
    <FormControl>
    <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        row
        value={selectedValue}
        onChange={handleChange}
    >
        <FormControlLabel value="create" control={<Radio />} label="Create" />
        <FormControlLabel value="join" control={<Radio />} label="Join" />
    </RadioGroup>
    </FormControl>
  )
}
