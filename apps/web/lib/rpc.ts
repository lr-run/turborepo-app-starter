import dns from 'node:dns'

import { createClient } from '@repo/server/rpc'

// https://stackoverflow.com/questions/73151551/can-nodejs-prefer-ipv6-dns-lookups-by-default
if (process.env.NODE_ENV !== 'production') {
  dns.setDefaultResultOrder('ipv4first')
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const client = createClient(process.env.RPC_BASE_URL!)
