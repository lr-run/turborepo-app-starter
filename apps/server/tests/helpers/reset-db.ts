import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async () => {
  console.log('---------------------- reset-db ----------------------')
  await prisma.$transaction([
    prisma.membership.deleteMany(),
    prisma.workspace.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
