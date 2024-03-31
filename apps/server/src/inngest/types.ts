import type { DeletedObjectJSON, UserJSON } from '@clerk/backend'

export type Events = {
  'clerk/user.created': { data: UserJSON }
  'clerk/user.updated': { data: UserJSON }
  'clerk/user.deleted': { data: DeletedObjectJSON }
}
