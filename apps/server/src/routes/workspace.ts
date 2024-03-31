import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import {
  createWorkspace,
  createWorkspaceSchema,
  deleteWorkspace,
  getWorkspace,
  listWorkspaces,
  partialUpdateWorkspaceSchema,
  partilaUpdateWorkspace,
  updateWorkspace,
  updateWorkspaceSchema,
} from '../models/workspace'

export const workspaceRoute = new Hono()
  .get('/', async (c) => {
    const workspaces = await listWorkspaces()
    return c.json({ items: workspaces })
  })
  .post('/', zValidator('json', createWorkspaceSchema), async (c) => {
    const validated = c.req.valid('json')
    const workspace = await createWorkspace(validated)
    return c.json(workspace)
  })
  .get('/:id', async (c) => {
    const workspace = await getWorkspace(c.req.param('id'))
    return c.json(workspace)
  })
  .put('/:id', zValidator('json', updateWorkspaceSchema), async (c) => {
    const validated = c.req.valid('json')
    const workspace = await updateWorkspace(c.req.param('id'), validated)
    return c.json(workspace)
  })
  .patch(
    '/:id',
    zValidator('json', partialUpdateWorkspaceSchema),
    async (c) => {
      const validated = c.req.valid('json')
      const workspace = await partilaUpdateWorkspace(
        c.req.param('id'),
        validated,
      )
      return c.json(workspace)
    },
  )
  .delete('/:id', async (c) => {
    await deleteWorkspace(c.req.param('id'))
    return c.json({})
  })
