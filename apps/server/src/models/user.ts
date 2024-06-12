import { gmy } from 'gummy'
import type { z } from 'zod'

import { db } from '../connection'
import { User } from '../db/types'

export const userSchema = gmy.createSelectSchema(User)
export type UserSchema = z.infer<typeof userSchema>

export const createUserSchema = gmy.createInsertSchema(User)
export type CreateUserSchema = z.infer<typeof createUserSchema>

export const createOrGetUserByClerkId = async (
  data: CreateUserSchema
): Promise<{ user: UserSchema; created: boolean }> => {
  const user = await db
    .insertInto('User')
    .values(data)
    .onConflict((oc) => oc.column('clerkId').doNothing())
    .returningAll()
    .executeTakeFirst()

  if (user) {
    return {
      user,
      created: true
    }
  }

  return {
    user: await db
      .selectFrom('User')
      .selectAll()
      .where('clerkId', '=', data.clerkId)
      .executeTakeFirstOrThrow(),
    created: false
  }
}

export const getUserByClerkIdOrUndefined = async (
  clerkId: string
): Promise<UserSchema | undefined> => {
  const users = await db
    .selectFrom('User')
    .selectAll()
    .where('clerkId', '=', clerkId)
    .execute()
  return users[0]
}

export const createOrUpdateUserByClerkId = async (
  data: CreateUserSchema
): Promise<UserSchema> => {
  return await db
    .insertInto('User')
    .values(data)
    .onConflict((oc) =>
      oc.column('clerkId').doUpdateSet({
        email: (eb) => eb.ref('excluded.email'),
        emailVerified: (eb) => eb.ref('excluded.emailVerified')
      })
    )
    .returningAll()
    .executeTakeFirstOrThrow()
}
