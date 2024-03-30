import { z } from 'zod'

import { genId } from './utils'
import { db } from '../connection'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  clerkId: z.string(),
})

export type User = z.infer<typeof userSchema>

export const createUserSchema = z.object({
  email: z.string(),
  emailVerified: z.boolean(),
  clerkId: z.string(),
})

export type CreateUser = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  email: z.string(),
  emailVerified: z.boolean(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>

export const createOrGetUserByClerkId = async (
  data: CreateUser,
): Promise<User> => {
  await db
    .insertInto('User')
    .values({
      ...data,
      id: genId(),
    })
    .onConflict((oc) => oc.column('clerkId').doNothing())
    .returningAll()
    .execute()

  return await db
    .selectFrom('User')
    .selectAll()
    .where('clerkId', '=', data.clerkId)
    .executeTakeFirstOrThrow()
}

export const getUserByClerkIdOrUndefined = async (
  clerkId: string,
): Promise<User | undefined> => {
  const users = await db
    .selectFrom('User')
    .selectAll()
    .where('clerkId', '=', clerkId)
    .execute()
  return users[0]
}
