import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Card, Position } from '~/api/@types'
import { StickyCard } from './StickyCard'
import styles from './styles.module.css'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    input: {
      type: Function as PropType<
        (cardId: Card['cardId'], text: string) => void
      >,
      required: true,
    },
    delete: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
    add: {
      type: Function as PropType<() => void>,
      required: true,
    },
    position: {
      type: Function as PropType<
        (cardId: Card['cardId'], postion: Position) => void
      >,
      required: true,
    },
    zIndex: {
      type: Function as PropType<
        (cardId: Card['cardId'], zIndex: number) => void
      >,
      required: true,
    },
  },

  setup(props) {
    const onClick = () => props.add()
    const isMoving = ref(false)
    const maxzIndex = ref(Math.max(...props.cards.map((item) => item.zIndex)))
    const cardStyle = ref({
      height: '0%',
      width: '0%',
      zIndex: 0,
    })
    const onMouseDown = () => {
      isMoving.value = true
      cardStyle.value = {
        height: '100%',
        width: '100%',
        zIndex: maxzIndex.value + 1,
      }
    }
    const onMouseUp = (cardId: number) => {
      isMoving.value = false
      cardStyle.value = {
        height: '0%',
        width: '0%',
        zIndex: cardId,
      }
    }

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div
            key={card.cardId}
            class={styles.cardMoveArea}
            id={'card' + card.cardId + ''}
            onMousedown={() => onMouseDown()}
            onMouseup={() => onMouseUp(card.cardId)}
            style={cardStyle.value}
          >
            <StickyCard
              key={card.cardId}
              card={card}
              input={(text) => props.input(card.cardId, text)}
              delete={() => props.delete(card.cardId)}
              position={(positon) => props.position(card.cardId, positon)}
              zIndex={(zIndex) => props.zIndex(card.cardId, zIndex)}
              style={{
                color: card.color,
                gridRow: card.cardId / props.cards.length,
              }}
            />
          </div>
        ))}
        <button class={styles.addButtom} type="submit" onClick={onClick}>
          +
        </button>
      </div>
    )
  },
})
