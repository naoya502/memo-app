import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import { Card } from '~/api/@types'
import { StickyCard } from './StickyCard'
import styles from './styles.module.css'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },

  setup(props) {
    const ctx = useContext()
    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <StickyCard
            key={card.cardId}
            style={{
              color: card.color,
              gridRow: card.cardId / props.cards.length,
            }}
            card={card}
          />
        ))}
      </div>
    )
  },
})
