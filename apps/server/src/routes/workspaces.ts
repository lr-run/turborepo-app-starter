import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { db } from '../connection'

export const workspacesRoute = new Hono()
  .get('/', async (c) => {
    const workspaces = await db
      .selectFrom('Workspace')
      .selectAll()
      .orderBy('id')
      .execute()

    return c.json({ items: workspaces })
  })
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    ),
    async (c) => {
      const validated = c.req.valid('json')
      const workspace = await db
        .insertInto('Workspace')
        .values({
          ...validated,
          id: '',
        })
        .returningAll()
        .executeTakeFirstOrThrow()
      return c.json(workspace)
    },
  )
  .get('/:id', async (c) => {
    const workspace = await db
      .selectFrom('Workspace')
      .selectAll()
      .where('id', '=', c.req.param('id'))
      .executeTakeFirstOrThrow()

    return c.json(workspace)
  })
  .put(
    '/:id',
    zValidator(
      'json',
      z.object({
        name: z.string(),
      }),
    ),
    async (c) => {
      const validated = c.req.valid('json')
      const workspace = await db
        .updateTable('Workspace')
        .set(validated)
        .where('id', '=', c.req.param('id'))
        .returningAll()
        .executeTakeFirstOrThrow()
      return c.json(workspace)
    },
  )
  .delete('/:id', async (c) => {
    await db
      .deleteFrom('Workspace')
      .where('id', '=', c.req.param('id'))
      .returningAll()
      .executeTakeFirstOrThrow()
    return c.json({})
  })
