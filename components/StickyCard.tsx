import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { Card, Position } from '~/api/@types'
import { DragHandler } from './DragHandler'
import styles from './styles.module.css'

export const StickyCard = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    input: {
      type: Function as PropType<(text: string) => void>,
      required: true,
    },
    delete: {
      type: Function as PropType<() => void>,
      required: true,
    },
    position: {
      type: Function as PropType<(position: Position) => void>,
      required: true,
    },
    isMouseMoving: {
      type: Function as PropType<(flg: string) => void>,
      required: false,
    },
  },
  setup(props) {
    const isForcusing = ref(false)
    const localtext = ref(props.card.text)
    const text = computed(() =>
      isForcusing.value ? localtext.value : props.card.text
    )
    const onInput = ({ target }: Event) => {
      if (!(target instanceof HTMLTextAreaElement)) return

      localtext.value = target.value
      props.input(target.value)
    }
    const onFocus = () => (isForcusing.value = true)
    const onBlur = () => (isForcusing.value = false)
    const onClick = () => props.delete()

    const isMoving = ref(false)
    const localPosition = ref(props.card.position)
    const containerPosition = ref(props.card.position)
    const onMouseMove = (position: Position) => {
      const movex = props.card.position.x + position.x
      const movey = props.card.position.y + position.y
      localPosition.value = {
        x: localPosition.value.x + position.x,
        y: localPosition.value.y + position.y,
      }

      isMoving.value = movex > 0 ? true : false
      props.card.position.x = isMoving.value ? movex : props.card.position.x
      props.card.position.y = isMoving.value ? movey : props.card.position.y

      localPosition.value = props.card.position
      containerPosition.value = isMoving.value
        ? localPosition.value
        : props.card.position
      props.position({ x: props.card.position.x, y: props.card.position.y })
    }

    return () => (
      <div
        class={styles.cardContainer}
        style={{
          top: `${containerPosition.value.y}px`,
          left: `${containerPosition.value.x}px`,
          backgroundColor: props.card.color,
        }}
      >
        {
          <DragHandler
            card={props.card}
            position={(p) => {
              onMouseMove(p)
            }}
            draggable="true"
          />
        }
        <button class={styles.deleteButtom} type="submit" onClick={onClick}>
          X
        </button>
        <textarea
          class={styles.textArea}
          style="border:none;"
          value={text.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {props.card.text}
        </textarea>
      </div>
    )
  },
})
