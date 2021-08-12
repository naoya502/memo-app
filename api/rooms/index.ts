import { mockMethods } from 'aspida-mock'

export type Room = {
  roomId: number
  roomName: string
  color: string
}

export type Methods = {
  get: {
    resBody: Room[]
  }
}

const rooms: Room[] = [
  { roomId: 0, roomName: 'room1', color: 'red' },
  { roomId: 1, roomName: 'room2', color: 'yellow' },
  { roomId: 2, roomName: 'room3', color: 'blue' },
  { roomId: 3, roomName: 'room4', color: 'green' },
]

export default mockMethods<Methods>({
  get: () => ({ status: 200, resBody: rooms }),
})
