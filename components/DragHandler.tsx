import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Card, Position } from '~/api/@types'
import styles from './styles.module.css'

export const DragHandler = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    position: {
      type: Function as PropType<(arg0: Position) => void>,
      required: true,
    },
  },
  setup(props) {
    const isDrag = ref(false)
    const cursor: Position = { x: 0, y: 0 }

    const onDragStart = (target: Event) => {
      if (!(target instanceof DragEvent)) return
      isDrag.value = true
      cursor.x = target.offsetX
      cursor.y = target.offsetY
    }
    const onDrag = (target: Event) => {
      if (!(target instanceof DragEvent)) return
      const px = isDrag.value ? +target.offsetX - cursor.x : 0
      const py = isDrag.value ? +target.offsetY - cursor.y : 0
      props.position({ x: px, y: py })
    }
    const onDragEnd = () => {
      isDrag.value = false
    }

    return () => (
      <div
        class={styles.stickyArea}
        is="dragHandler"
        onDragstart={onDragStart}
        onDrag={onDrag}
        onDragend={onDragEnd}
      ></div>
    )
  },
})
