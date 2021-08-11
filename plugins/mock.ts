import type { Plugin } from '@nuxt/types'
import client from '@aspida/fetch'
import mock from '~/api/$mock'

const plugin: Plugin = (_, inject) =>
  inject('api', mock(client(), { log: true }))

export default plugin
