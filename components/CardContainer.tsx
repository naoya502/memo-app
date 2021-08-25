import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import type { Card, Position } from '~/api/@types'
import styles from '~/components/styles.module.css'
import { StickyCard } from './StickyCard'

export const CardContainer = defineComponent({
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
    zIndex: {
      type: Function as PropType<
        (cardId: Card['cardId'], zIndex: number) => void
      >,
      required: true,
    },
    maxzIndex: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props) {
    const maxzIndex = computed(() => props.maxzIndex)
    const isMoving = ref(false)
    const localCardStyles = ref({
      id: props.card.cardId,
      style: { height: '0%', width: '0%', zIndex: props.card.zIndex },
    })
    const displayCardStyles = computed(() => localCardStyles.value.style)
    const setCardStyles = (cardid: number, zIndex: number) =>
      (localCardStyles.value = {
        ...localCardStyles.value,
        id: cardid,
        style: {
          ...localCardStyles.value,
          height: '0%',
          width: '0%',
          zIndex: zIndex,
        },
      })
    const expandMoveArea = (cardid: number, zIndex: number) => ({
      ...localCardStyles.value,
      id: cardid,
      style: { height: '100%', width: '100%', zIndex: zIndex },
    })
    const shrinkMoveArea = (cardid: number, zIndex: number) => ({
      id: cardid,
      style: { height: '0%', width: '0%', zIndex: zIndex },
    })
    const onMouseDown = (cardId: number, zIndex: number) => {
      const updatezIndex = +maxzIndex.value + 1
      localCardStyles.value = expandMoveArea(cardId, updatezIndex)
      isMoving.value = true
      props.zIndex(props.card.cardId, updatezIndex)
    }
    const onMouseUp = (cardId: number) => {
      const updatezIndex = localCardStyles.value.style.zIndex
      localCardStyles.value = shrinkMoveArea(cardId, updatezIndex)
      isMoving.value = false
    }
    return () => (
      <div
        class={styles.cardMoveArea}
        id={'card' + `${props.card.cardId}`}
        style={displayCardStyles.value}
        onMousedown={() => onMouseDown(props.card.cardId, props.card.zIndex)}
        onMouseup={() => onMouseUp(props.card.cardId)}
      >
        <StickyCard
          card={props.card}
          input={(text) => props.input(text)}
          delete={() => props.delete()}
          position={(position) => props.position(position)}
        />
      </div>
    )
  },
})
