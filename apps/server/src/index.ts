import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { workspacesRoute } from './routes/workspaces'

import 'dotenv/config'

const app = new Hono()

app.use('/*', cors())
app.use(logger())

const routes = app.route('/workspaces', workspacesRoute)

export type AppType = typeof routes

const port = process.env.PORT != null ? parseInt(process.env.PORT, 10) : 8000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

export { app }
