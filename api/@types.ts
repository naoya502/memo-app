export type Position = {
  x: number
  y: number
}

export type Card = {
  cardId: number
  text: string
  color: string
  position: Position
  zIndex: number
}

export type Room = {
  roomId: number
  roomName: string
  color: string
  cards: Card[]
}

export type Color = {
  color: string
}
