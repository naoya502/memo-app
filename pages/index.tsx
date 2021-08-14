import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { Room } from '~/api/@types'
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

    return () =>
      rooms.value ? (
        // <div class={styles.sampleFont}>
        <div class={styles.container}>
          {/* users.value && <Tutorial users={users.value} /> */}
          {<Sidebar rooms={rooms.value} />}
          {roomId.value != undefined && <Board cards={rooms.value[0].cards} />}
        </div>
      ) : (
        <div>Loading...</div>
      )
  },
})
