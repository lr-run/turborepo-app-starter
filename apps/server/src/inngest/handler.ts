import type { Context } from 'hono'
import { InngestCommHandler, type ServeHandlerOptions } from 'inngest'

export const serve = (options: ServeHandlerOptions) => {
  const handler = new InngestCommHandler({
    frameworkName: 'hono',
    ...options,
    handler: (c: Context) => {
      return {
        body: () => c.req.json(),
        headers: (key) => c.req.header(key),
        method: () => c.req.method,
        url: () => new URL(c.req.url, `https://${c.req.header('host') ?? ''}`),

        transformResponse: ({ body, status, headers }) => {
          return new Response(body, { status, headers })
        },
      }
    },
  })

  return handler.createHandler()
}
