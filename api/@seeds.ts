import { Room } from './@types'

export const colors: string[] = [
  '#768EB7',
  '#65A6E8',
  '#768EB7',
  '#4182CE',
  '#2565B7',
  '#B59599',
]
export const rooms: Room[] = [
  {
    roomId: 0,
    roomName: 'room1',
    color: 'red',
    cards: [
      {
        cardId: 0,
        text: 'room1_card1',
        color: 'red',
        position: {
          x: 200,
          y: 100,
        },
      },
      {
        cardId: 1,
        text: 'room1_card2',
        color: 'yellow',
        position: {
          x: 300,
          y: 120,
        },
      },
      {
        cardId: 2,
        text: 'room1_card3',
        color: 'blue',
        position: {
          x: 400,
          y: 140,
        },
      },
    ],
  },
  {
    roomId: 1,
    roomName: 'room2',
    color: 'yellow',
    cards: [
      {
        cardId: 0,
        text: 'room2_card1',
        color: 'red',
        position: {
          x: 200,
          y: 100,
        },
      },
      {
        cardId: 1,
        text: 'room2_card2',
        color: 'yellow',
        position: {
          x: 300,
          y: 120,
        },
      },
    ],
  },
  {
    roomId: 2,
    roomName: 'room3',
    color: 'blue',
    cards: [
      {
        cardId: 0,
        text: 'room3_card1',
        color: 'red',
        position: {
          x: 200,
          y: 100,
        },
      },
    ],
  },
  { roomId: 3, roomName: 'room4', color: 'green', cards: [] },
]
