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
  },

  setup(props) {
    const onClick = () => props.add()
    const isClick = ref(false)
    const onMouseDown = () => {
      isClick.value = true
    }
    const onMouseUp = () => {
      isClick.value = false
    }

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div
            key={card.cardId}
            class={isClick.value ? styles.cardMoveArea : styles.cardFixedArea}
            onMousemove={onMouseDown}
            onMouseup={onMouseUp}
          >
            <StickyCard
              key={card.cardId}
              card={card}
              input={(text) => props.input(card.cardId, text)}
              delete={() => props.delete(card.cardId)}
              position={(positon) => props.position(card.cardId, positon)}
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
