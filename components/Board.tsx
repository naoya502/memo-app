import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Card, Position } from '~/api/@types'
import { CardContainer } from './CardContainer'
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
    const maxzIndex = computed(() =>
      Math.max(...props.cards.map((item) => item.zIndex))
    )
    const onClick = () => props.add()
    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card, i) => (
          <CardContainer
            key={card.cardId}
            card={card}
            input={(text) => props.input(card.cardId, text)}
            delete={() => props.delete(card.cardId)}
            position={(position) => props.position(card.cardId, position)}
            zIndex={(cardId, zIndex) => props.zIndex(card.cardId, zIndex)}
            maxzIndex={maxzIndex.value}
          />
        ))}
        <button class={styles.addButtom} type="submit" onClick={onClick}>
          +
        </button>
      </div>
    )
  },
})
