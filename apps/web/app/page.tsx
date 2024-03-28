import { UserButton } from '@clerk/nextjs'
import { Button } from '@repo/ui'

import { client } from '@/lib/rpc'

const Home: React.FC = async () => {
  const res = await client.workspaces.$get()
  const { items: workspaces } = await res.json()

  return (
    <div className="flex h-screen flex-col items-center">
      <UserButton />
      <h1 className="pb-4 text-4xl">turborepo-app-starter</h1>
      <ul className="pb-8">
        {workspaces.map((workspace) => (
          <li className="text-2xl" key={workspace.id}>
            {workspace.name}
          </li>
        ))}
      </ul>
      <Button>Hello</Button>
    </div>
  )
}

export default Home
