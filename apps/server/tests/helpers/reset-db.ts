import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async () => {
  console.log('---------------------- reset-db ----------------------')
  await prisma.$transaction([
    prisma.workspace.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
