import { hc, type ClientRequestOptions } from 'hono/client'

import type { AppType } from './index'

export const createClient = (
  baseUrl: string,
  options?: ClientRequestOptions,
) => {
  return hc<AppType>(baseUrl, options)
}
