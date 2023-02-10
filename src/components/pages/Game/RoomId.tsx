import React from 'react'

interface RoomId {
    roomId: string
}

export const RoomId = ({roomId}: RoomId) => {
  return (
    <div>{roomId}</div>
  )
}
