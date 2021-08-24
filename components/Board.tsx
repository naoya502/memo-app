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
    const cardStyle = ref({
      id: 0,
      style: { height: '0%', width: '0%', zIndex: 0 },
    })
    const propCardStyles = (cardid: number, zIndex: number) => {
      return (cardStyle.value = {
        ...cardStyle.value,
        id: cardid,
        style: { height: '0%', width: '0%', zIndex: zIndex },
      })
    }
    const localCardStyles = ref(
      props.cards.map((c) => propCardStyles(c.cardId, c.zIndex))
    )
    const maxzIndex = ref(
      Math.max(...props.cards.map((item) => item.zIndex)) + 1
    )
    const onMouseDown = (cardId: number) => {
      if (!localCardStyles.value) return
      localCardStyles.value = localCardStyles.value.map((s) =>
        s.id === cardId
          ? {
              ...localCardStyles.value,
              id: s.id,
              style: { height: '100%', width: '100%', zIndex: maxzIndex.value },
            }
          : {
              ...localCardStyles.value,
              id: s.id,
              style: { height: '0%', width: '0%', zIndex: s.style.zIndex },
            }
      )
    }
    const onMouseUp = () => {
      localCardStyles.value = localCardStyles.value.map((s) => ({
        ...localCardStyles.value,
        id: s.id,
        style: { height: '0%', width: '0%', zIndex: s.style.zIndex },
      }))
    }
    const getStyle = (cardId: number) => {
      console.log(localCardStyles.value.find((s) => s.id === cardId)?.style)
      return localCardStyles.value.find((s) => s.id === cardId)?.style
    }

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div
            key={card.cardId}
            class={styles.cardMoveArea}
            id={'card' + `${card.cardId}`}
            style={getStyle(card.cardId)}
            onMousedown={() => onMouseDown(card.cardId)}
            onMouseup={onMouseUp}
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
