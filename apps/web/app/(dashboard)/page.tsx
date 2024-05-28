import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from '@lr/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@lr/ui/table'

import { client } from '@/lib/rpc'

import { CreateWorkspaceButton } from '../_presentation/CreateWorkspaceButton'
import { DeleteWorkspaceButton } from '../_presentation/DeleteWorkspaceButton'
import { UpdateWorkspaceButton } from '../_presentation/UpdateWorkspaceButton'

const Home: React.FC = async () => {
  const { sessionId } = auth()
  if (!sessionId) {
    return null
  }

  const res = await client.api.workspaces.$get()
  const { items: workspaces } = await res.json()
  return (
    <div className="grid gap-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Workspaces</CardTitle>
          </div>
          <CreateWorkspaceButton />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaces.map((workspace) => (
                <TableRow key={workspace.id}>
                  <TableCell>{workspace.id}</TableCell>
                  <TableCell>{workspace.name}</TableCell>
                  <TableCell>{workspace.slug}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UpdateWorkspaceButton workspace={workspace} />
                      <DeleteWorkspaceButton workspace={workspace} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
