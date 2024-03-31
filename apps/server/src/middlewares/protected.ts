import { getAuth } from '@hono/clerk-auth'
import type { MiddlewareHandler } from 'hono'

import { getUserInfo } from '../clerk'
import {
  createOrGetUserByClerkId,
  getUserByClerkIdOrUndefined,
} from '../models/user'

export const protectedMiddleware = (): MiddlewareHandler => async (c, next) => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json(
      {
        message: 'Unauthorized.',
      },
      401,
    )
  }

  let user = await getUserByClerkIdOrUndefined(auth.userId)
  if (!user) {
    const clerkClient = c.get('clerk')
    const clerkUser = await getUserInfo(clerkClient, auth.userId)
    // we use get_or_create when creating unknown users since
    // it has built-in safeguards for multiple threads.
    const { user: _user } = await createOrGetUserByClerkId(clerkUser)
    user = _user
  }

  c.set('user', user)

  await next()
}
