import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import { Room } from '~/api/@types'
import styles from './styles.module.css'

export const Sidebar = defineComponent({
  props: {
    rooms: {
      type: Array as PropType<Room[]>,
      required: true,
    },
  },

  setup(props) {
    const ctx = useContext()
    return () => (
      <div class={styles.sidebarContainer}>
        {props.rooms.map((room) => (
          <nuxt-link
            class={styles.sidebarBox}
            key={room.roomId}
            to={ctx.$pagesPath.$url({ query: { roomId: room.roomId } })}
          >
            <div
              style={{
                color: room.color,
                gridRow: room.roomId / props.rooms.length,
              }}
            >
              {room.roomName}
            </div>
          </nuxt-link>
        ))}
      </div>
    )
  },
})
