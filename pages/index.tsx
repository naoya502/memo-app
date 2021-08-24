import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { Card, Position, Room } from '~/api/@types'
import { Board } from '~/components/Board'
import { Sidebar } from '~/components/Sidebar'
import styles from './styles.module.css'

export type OptionalQuery = {
  roomId: number
}

export default defineComponent({
  setup() {
    const ctx = useContext()
    const route = useRoute()
    // const users = ref<User[]>()
    const rooms = ref<Room[]>()
    const roomId = computed(() => {
      const { roomId } = route.value.query
      return isNaN(+roomId) ? undefined : +roomId
    })

    onMounted(async () => {
      // users.value = await ctx.$api.users.$get()
      rooms.value = await ctx.$api.rooms.$get()
    })

    const updateCardText = async (cardId: Card['cardId'], text: string) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { text } })

      rooms.value = await ctx.$api.rooms.$get()
    }

    const deleteCard = async (cardId: Card['cardId']) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$delete()

      rooms.value = await ctx.$api.rooms.$get()
    }

    const addCard = async () => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms._roomId(validateRoomId).cards.$post()

      rooms.value = await ctx.$api.rooms.$get()
    }

    const updatePositionCard = async (
      cardId: Card['cardId'],
      position: Position
    ) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { position } })

      rooms.value = await ctx.$api.rooms.$get()
    }
    const updateZindex = async (cardId: Card['cardId'], zIndex: number) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { zIndex } })

      rooms.value = await ctx.$api.rooms.$get()
    }

    return () =>
      rooms.value ? (
        // <div class={styles.sampleFont}>
        <div class={styles.container}>
          {/* users.value && <Tutorial users={users.value} /> */}
          {<Sidebar rooms={rooms.value} />}
          {roomId.value != undefined && (
            <Board
              cards={rooms.value[roomId.value].cards}
              input={updateCardText}
              delete={deleteCard}
              add={addCard}
              position={updatePositionCard}
              zIndex={updateZindex}
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )
  },
})
