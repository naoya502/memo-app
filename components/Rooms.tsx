import { defineComponent, PropType } from '@nuxtjs/composition-api'
import type { Room } from '~/api/rooms'
import styles from './styles.module.css'

export const Rooms = defineComponent({
  props: {
    rooms: {
      type: Array as PropType<Room[]>,
      required: true,
    },
  },

  setup(props) {
    return () => (
      <div class={styles.container}>
        {props.rooms.map((room) => (
          <div
            class={styles.box}
            key={room.roomId}
            style={{ color: room.color, gridRow: room.roomId / 4 }}
          >
            {room.roomName}
          </div>
        ))}
      </div>
    )
  },
})
