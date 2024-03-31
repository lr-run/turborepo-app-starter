'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import type { Workspace } from '@lr/server/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@lr/ui/alert-dialog'
import { Button } from '@lr/ui/button'

import { useRpc } from '@/lib/rpc-client'

type Props = {
  workspace: Workspace
}

export const DeleteWorkspaceButton: React.FC<Props> = ({ workspace }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { client } = useRpc()

  const onSubmit = async () => {
    setOpen(false)
    await client.api.workspaces[':id'].$delete({ param: { id: workspace.id } })
    router.refresh()
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="h-7" size="sm" variant="outline">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Are you sure to delete workpace `}
            <u className="underline">{workspace.name}</u>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
