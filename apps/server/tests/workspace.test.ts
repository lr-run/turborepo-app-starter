import { beforeEach, describe, expect, it } from 'vitest'

import prisma from './helpers/prisma'
import { WorkspaceFactory } from '../seed/factories'
import { db } from '../src/connection'
import { app } from '../src/index'

describe('/workspaces', () => {
  beforeEach(async () => {
    for (let i = 0; i < 10; i++) {
      const id = (i + 1).toString()
      const data = await WorkspaceFactory.build({
        id,
        slug: `workspace-${id}`,
        name: `Workspace ${id}`,
      })
      await prisma.workspace.upsert({
        where: { id },
        create: data,
        update: data,
      })
    }
  })

  describe('[GET] /workspaces', () => {
    it('should return a list of workspaces', async () => {
      const res = await app.request('/workspaces', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(res.status).toBe(200)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json()

      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      expect(data.items).length(10)
      expect(data.items[0].id).toBe('1')
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    })
  })

  describe('[POST] /workspaces', () => {
    it('should create 1 workspaces', async () => {
      const res = await app.request('/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Workspace',
          slug: 'new-workspace',
        }),
      })
      expect(res.status).toBe(200)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json()

      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      const newWorkspace = await db
        .selectFrom('Workspace')
        .selectAll()
        .where('id', '=', data.id)
        .executeTakeFirstOrThrow()
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */

      expect(newWorkspace.name).toBe('New Workspace')
      expect(newWorkspace.slug).toBe('new-workspace')
    })
  })

  describe('[PUT] /workspaces', () => {
    it('should update 1 workspaces', async () => {
      const res = await app.request('/workspaces/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Updated Workspace',
        }),
      })

      expect(res.status).toBe(200)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json()

      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      expect(data.name).toBe('Updated Workspace')
      expect(data.slug).toBe('workspace-1')
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */

      const updatedWorkspace = await db
        .selectFrom('Workspace')
        .selectAll()
        .where('id', '=', '1')
        .executeTakeFirstOrThrow()

      expect(updatedWorkspace.name).toBe('Updated Workspace')
      expect(updatedWorkspace.slug).toBe('workspace-1')
    })
  })

  describe('[DELETE] /workspaces', () => {
    it('should delete 1 workspaces', async () => {
      const res = await app.request('/workspaces/1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(res.status).toBe(200)

      const updatedWorkspace = await db
        .selectFrom('Workspace')
        .selectAll()
        .where('id', '=', '1')
        .execute()

      expect(updatedWorkspace).length(0)
    })
  })
})
