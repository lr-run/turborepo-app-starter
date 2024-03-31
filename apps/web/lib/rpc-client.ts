import { useAuth } from '@clerk/nextjs'
import { createClient } from '@lr/server/rpc'

export const useRpc = () => {
  const { getToken } = useAuth()

  const authenticatedFetch = async (
    input: string | URL | globalThis.Request,
    init?: RequestInit,
  ) => {
    return await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${(await getToken()) ?? ''}`,
        'Content-Type': 'application/json',
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const client = createClient(process.env.NEXT_PUBLIC_RPC_BASE_URL!, {
    fetch: authenticatedFetch,
  })

  return { client }
}
