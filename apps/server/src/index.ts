import { clerkMiddleware } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { protectedMiddleware } from './middlewares/protected'
import { workspaceRoute } from './routes/workspace'

import 'dotenv/config'

const app = new Hono()

app.use(logger())
app.use('/*', cors())

app.use('*', clerkMiddleware())
app.use('*', protectedMiddleware())

const routes = app.route('/workspaces', workspaceRoute)

export type AppType = typeof routes

const port = process.env.PORT != null ? parseInt(process.env.PORT, 10) : 8000
console.log(`Server is running on port ${port.toString()}`)

serve({
  fetch: app.fetch,
  port,
})

export { app }
