import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

import 'dotenv/config'

import type { DB } from './db/types'

const connectionString = process.env.DATABASE_URL

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({ connectionString }),
  }),
  log: process.env.NODE_ENV !== 'production' ? ['query'] : undefined,
})
