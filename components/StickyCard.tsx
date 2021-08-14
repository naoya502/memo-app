import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import { Card } from '~/api/@types'
import styles from './styles.module.css'

export const StickyCard = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
  },
  setup(props) {
    const ctx = useContext()

    return () => (
      <div
        class={styles.cardContainer}
        style={{
          top: `${props.card.position.y}px`,
          left: `${props.card.position.x}px`,
          backgroundColor: props.card.color,
        }}
      >
        <div class={styles.stickyArea}></div>
        <textarea class={styles.textArea} style="border:none;">
          {props.card.text}
        </textarea>
      </div>
    )
  },
})
