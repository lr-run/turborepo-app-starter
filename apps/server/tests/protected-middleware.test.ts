import { clerkMiddleware } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { describe, expect, it } from 'vitest'

import { db } from '../src/connection'
import { protectedMiddleware } from '../src/middlewares/protected'

describe('protectedMiddleware()', () => {
  const app = new Hono()
  app.use('*', clerkMiddleware())
  app.use('*', protectedMiddleware())

  app.get('/', (ctx) => {
    return ctx.json({})
  })

  it('automatically create user', async () => {
    const res = await app.request('/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(res.status).toBe(200)

    const user = await db
      .selectFrom('User')
      .selectAll()
      .where('clerkId', '=', 'test-clerk-id')
      .executeTakeFirst()

    expect(user?.email).toBe('test@test.com')
    expect(user?.emailVerified).toBe(true)
    expect(user?.clerkId).toBe('test-clerk-id')
  })

  it('retrieve created user after first request', async () => {
    const res = await app.request('/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(res.status).toBe(200)

    const res2 = await app.request('/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(res2.status).toBe(200)
  })
})
