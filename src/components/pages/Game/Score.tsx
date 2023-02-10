import React from 'react';
import { useAppSelector } from '../../../app/hooks/hooks';

export const Score = () => {
    const score = useAppSelector((state) => state.room.score);
  return (
    <div>
        {score.my} {score.enemy}
    </div>
  )
}
