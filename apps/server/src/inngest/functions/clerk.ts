import type { UserJSON } from '@clerk/backend'

import { createOrUpdateUserByClerkId } from '../../models/user'
import { genId } from '../../models/utils'
import { inngest } from '../client'

export const syncUser = async (event: { data: UserJSON }) => {
  const clerkUserJson = event.data
  const { id } = clerkUserJson
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const email = clerkUserJson.email_addresses.find(
    (e) => e.id === clerkUserJson.primary_email_address_id,
  )!.email_address

  return await createOrUpdateUserByClerkId({
    id: genId(),
    clerkId: id,
    email,
    emailVerified: true,
  })
}

export const syncCreatedUser = inngest.createFunction(
  { id: 'sync-created-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    return await syncUser(event)
  },
)

export const syncUpdatedUser = inngest.createFunction(
  { id: 'sync-updated-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    return await syncUser(event)
  },
)

export const syncDeletedUser = inngest.createFunction(
  { id: 'sync-deleted-user-from-clerk' },
  { event: 'clerk/user.deleted' },
  ({ event }) => {
    // TODO: handle clerk user deletion
    console.log(`A user was deleted from Clerk: ${JSON.stringify(event.data)}`)
  },
)
