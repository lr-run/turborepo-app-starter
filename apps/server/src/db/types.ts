import type { ColumnType } from 'kysely'
import { gmy } from 'gummy'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export const User = gmy.table('User', {
  id: gmy.varchar('id', { length: 30 }).primaryKey(),
  email: gmy.email('email').notNull(),
  emailVerified: gmy.boolean('emailVerified').notNull().default(false),
  clerkId: gmy.varchar('clerkId', { length: 100 }).notNull(),
})

export const Workspace = gmy.table('Workspace', {
  id: gmy.varchar('id', { length: 30 }).primaryKey(),
  name: gmy.varchar('name', { length: 255 }).notNull(),
  slug: gmy.varchar('slug', { length: 255 }).notNull(),
})

export type DB = {
  User: gmy.Kyselify<typeof User>
  Workspace: gmy.Kyselify<typeof Workspace>
}
