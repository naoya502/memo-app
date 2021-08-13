import { mockMethods } from 'aspida-mock'
import type { Room } from '../@types'

export type Methods = {
  get: {
    resBody: Room[]
  }
}

const rooms: Room[] = [
  { roomId: 0, roomName: 'room1', color: 'red', cards: [] },
  { roomId: 1, roomName: 'room2', color: 'yellow', cards: [] },
  { roomId: 2, roomName: 'room3', color: 'blue', cards: [] },
  { roomId: 3, roomName: 'room4', color: 'green', cards: [] },
]

export default mockMethods<Methods>({
  get: () => ({ status: 200, resBody: rooms }),
})
