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
    zIndex: {
      type: Function as PropType<(zIndex: number) => void>,
      required: true,
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
    const containerPosition = computed(() =>
      localPosition.value === props.card.position
        ? props.card.position
        : localPosition.value
    )
    const onMouseMove = (position: Position) => {
      const movex = localPosition.value.x + position.x
      const movey = localPosition.value.y + position.y

      isMoving.value = movex > 0 ? true : false
      localPosition.value = isMoving.value
        ? { x: movex, y: movey }
        : localPosition.value
      props.position({ x: localPosition.value.x, y: localPosition.value.y })
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
            // draggable="true"
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
