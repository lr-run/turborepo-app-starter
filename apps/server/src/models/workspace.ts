import { gmy } from 'gummy'
import { z } from 'zod'

import { genId } from './utils'
import { db } from '../connection'
import { Workspace } from '../db/types'

export const workspaceSchema = gmy.createSelectSchema(Workspace)
export type WorkspaceSchema = z.infer<typeof workspaceSchema>

export const createWorkspaceSchema = gmy.createInsertSchema(Workspace)
export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>

export const updateWorkspaceSchema = z.object({
  name: z.string(),
})
export type UpdateWorkspace = z.infer<typeof updateWorkspaceSchema>

export const partialUpdateWorkspaceSchema = z.object({
  name: z.string().optional(),
})

export type PartialUpdateWorkspace = z.infer<
  typeof partialUpdateWorkspaceSchema
>

export const listWorkspaces = async (): Promise<WorkspaceSchema[]> => {
  return await db.selectFrom('Workspace').selectAll().orderBy('id').execute()
}

export const createWorkspace = async (
  data: CreateWorkspaceSchema,
): Promise<WorkspaceSchema> => {
  return await db
    .insertInto('Workspace')
    .values({
      ...data,
      id: genId(),
    })
    .returningAll()
    .executeTakeFirstOrThrow()
}

export const getWorkspace = async (id: string): Promise<WorkspaceSchema> => {
  return await db
    .selectFrom('Workspace')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow()
}

export const updateWorkspace = async (
  id: string,
  data: UpdateWorkspace,
): Promise<WorkspaceSchema> => {
  return await db
    .updateTable('Workspace')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export const partilaUpdateWorkspace = async (
  id: string,
  data: PartialUpdateWorkspace,
): Promise<WorkspaceSchema> => {
  return await db
    .updateTable('Workspace')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export const deleteWorkspace = async (id: string): Promise<void> => {
  await db
    .deleteFrom('Workspace')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow()
}
