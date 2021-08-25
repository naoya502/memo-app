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
        color: colors[0],
        position: {
          x: 200,
          y: 100,
        },
        zIndex: 1,
      },
      {
        cardId: 1,
        text: 'room1_card2',
        color: colors[3],
        position: {
          x: 300,
          y: 120,
        },
        zIndex: 2,
      },
      {
        cardId: 2,
        text: 'room1_card3',
        color: colors[5],
        position: {
          x: 400,
          y: 140,
        },
        zIndex: 3,
      },
    ],
    order: [0, 1, 2],
  },
  {
    roomId: 1,
    roomName: 'room2',
    color: 'yellow',
    cards: [
      {
        cardId: 0,
        text: 'room2_card1',
        color: colors[0],
        position: {
          x: 200,
          y: 100,
        },
        zIndex: 1,
      },
      {
        cardId: 1,
        text: 'room2_card2',
        color: colors[3],
        position: {
          x: 300,
          y: 120,
        },
        zIndex: 2,
      },
    ],
    order: [0, 1],
  },
  {
    roomId: 2,
    roomName: 'room3',
    color: 'blue',
    cards: [
      {
        cardId: 0,
        text: 'room3_card1',
        color: colors[0],
        position: {
          x: 200,
          y: 100,
        },
        zIndex: 1,
      },
    ],
    order: [0],
  },
  { roomId: 3, roomName: 'room4', color: 'green', cards: [], order: [] },
]
