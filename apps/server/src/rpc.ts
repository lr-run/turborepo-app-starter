import { hc } from 'hono/client'

import type { AppType } from './index'

export const createClient = (baseUrl: string) => {
  return hc<AppType>(baseUrl)
}
