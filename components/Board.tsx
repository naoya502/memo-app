import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
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
    updateOrder: {
      type: Function as PropType<(cardId: number[]) => void>,
      required: true,
    },
  },

  setup(props) {
    const onClick = () => props.add()
    const cardIds = ref(props.cards.map((card) => card.cardId))
    watch(
      () => props.cards,
      () => (cardIds.value = props.cards.map((card) => card.cardId))
    )
    const addCardIdToTail = (id: number) => {
      cardIds.value = [...cardIds.value.filter((card) => card !== id), id]
      props.updateOrder(cardIds.value)
    }
    const getCardById = (cardId: number) =>
      props.cards.filter((card) => card.cardId === cardId)[0]

    return () => (
      <div class={styles.boardContainer}>
        {cardIds.value.map((cardId) => (
          <div key={cardId} onMousedown={() => addCardIdToTail(cardId)}>
            <StickyCard
              card={getCardById(cardId)}
              input={(text) => props.input(cardId, text)}
              delete={() => props.delete(cardId)}
              position={(position) => props.position(cardId, position)}
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
