import { mockMethods } from 'aspida-mock'
import { colors, rooms } from '~/api/@seeds'
import type { Card } from '~/api/@types'

export type Methods = {
  post: { resBody: Card }
}

export default mockMethods<Methods>({
  post: (params) => {
    const { roomId, cardId } = params.values
    if (typeof roomId === 'string' || typeof cardId === 'string')
      return { status: 400 }

    /*  カードIDについてはMock段階なので絶対にぶつからない桁数で生成
        ランダムで０.～を生成して文字列に変換
        文字列の「0.」以降をスライス
        スライスした文字列を「＋」で数値にコンバート  */
    const tmpcardId = +`${Math.random()}`.slice(2)
    const tmpColor = colors[Math.floor(Math.random() * colors.length)]

    const card: Card = {
      cardId: tmpcardId,
      text: '',
      color: tmpColor,
      position: {
        x: 0,
        y: 0,
      },
    }

    const room = rooms.find((r) => r.roomId === roomId)

    if (!room || !card)
      return {
        status: 400,
      }

    // [?]はundefinedだった場合、その後の[.cards.push(card)]を実行しないため、undefinedによるバグがなくなる
    room?.cards.push(card)

    return { status: 200, resBody: card }
  },
})
