import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { db } from './connection'

import 'dotenv/config'

const app = new Hono()

app.use('/*', cors())
app.use(logger())

const route = app.get('/workspaces', async (c) => {
  const workspaces = await db.selectFrom('Workspace').selectAll().execute()

  return c.json({ workspaces })
})

export type AppType = typeof route

const port = 8000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
