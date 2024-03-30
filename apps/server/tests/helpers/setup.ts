import type { MiddlewareHandler } from 'hono'
import { beforeEach, vi } from 'vitest'

import resetDb from './reset-db'

const mockedClerkMiddleware = (): MiddlewareHandler => async (c, next) => {
  await next()
}

const mockedGetAuth = () => {
  return {
    userId: 'test-user-id',
  }
}

vi.mock('@hono/clerk-auth', () => {
  return {
    clerkMiddleware: vi.fn(mockedClerkMiddleware),
    getAuth: vi.fn(mockedGetAuth),
  }
})

beforeEach(async () => {
  await resetDb()
  vi.restoreAllMocks()
})
