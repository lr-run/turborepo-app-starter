import { PrismaClient } from '@prisma/client'

import { MembershipFactory } from './factories'

const prisma = new PrismaClient()

const times = (v: number) =>
  Array(v)
    .fill(null)
    .map((_, i) => i + 1)

async function main() {
  for (const i of times(10)) {
    const data = await MembershipFactory.build()
    await prisma.membership.upsert({
      where: { id: `${i + 1}` },
      create: data,
      update: data,
    })
  }
}

await main()
