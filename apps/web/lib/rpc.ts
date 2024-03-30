import 'server-only'

import { cookies } from 'next/headers'

import dns from 'node:dns'

import { createClient } from '@repo/server/rpc'

// https://stackoverflow.com/questions/73151551/can-nodejs-prefer-ipv6-dns-lookups-by-default
if (process.env.NODE_ENV !== 'production') {
  dns.setDefaultResultOrder('ipv4first')
}

const customFetch = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) => {
  const cookieStore = cookies()
  return await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${cookieStore.get('__session')?.value}`,
      'Content-Type': 'application/json',
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const client = createClient(process.env.NEXT_PUBLIC_RPC_BASE_URL!, {
  fetch: customFetch,
})
