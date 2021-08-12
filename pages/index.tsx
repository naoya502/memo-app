import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
// import type { User } from '~/api/users'
// import { Tutorial } from '~/components/Tutorial'
import type { Room } from '~/api/rooms'
import { Rooms } from '~/components/Rooms'
// import styles from './styles.module.css'

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
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            {/* users.value && <Tutorial users={users.value} /> */}
            {rooms.value && <Rooms rooms={rooms.value} />}
          </div>
        </div>
      </div>
    )
  },
})
