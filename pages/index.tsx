import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { Room } from '~/api/@types'
import { Rooms } from '~/components/Rooms'
import styles from './styles.module.css'

export type OptionalQuery = {
  roomId: number
}

export default defineComponent({
  setup() {
    const ctx = useContext()
    // const users = ref<User[]>()
    const rooms = ref<Room[]>()

    onMounted(async () => {
      // users.value = await ctx.$api.users.$get()
      rooms.value = await ctx.$api.rooms.$get()
      console.log(rooms.value)
    })

    return () => (
      // <div class={styles.sampleFont}>
      <div class={styles.container}>
        {/* users.value && <Tutorial users={users.value} /> */}
        {rooms.value && <Rooms rooms={rooms.value} />}
      </div>
    )
  },
})
