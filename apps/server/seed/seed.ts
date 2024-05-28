import { WorkspaceFactory } from './factories'
import { PrismaClient } from '../src/__generated__/client'

const prisma = new PrismaClient()

const times = (v: number) =>
  Array(v)
    .fill(null)
    .map((_, i) => i + 1)

async function main() {
  for (const i of times(10)) {
    const data = await WorkspaceFactory.build()
    await prisma.workspace.upsert({
      where: { id: (i + 1).toString() },
      create: data,
      update: data,
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
