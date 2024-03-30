'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Workspace } from '@repo/server/types'
import { Button } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRpc } from '@/lib/rpc-client'

const schema = z.object({
  name: z.string().min(1),
})

type Props = {
  workspace: Workspace
}

export const UpdateWorkspaceButton: React.FC<Props> = ({ workspace }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: workspace.name,
    },
  })

  const { handleSubmit } = form

  const { client } = useRpc()

  const onSubmit = handleSubmit(async (data) => {
    setOpen(false)
    await client.workspaces[':id'].$put({
      param: { id: workspace.id },
      json: data,
    })
    form.reset()
    router.refresh()
  })

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="h-7" size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Workspace</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
