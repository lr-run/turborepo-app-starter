import { PrismaClient } from '../src/__generated__/client'

const prisma = new PrismaClient()

const createTestDb = async () => {
  await prisma.$executeRaw`DROP DATABASE IF EXISTS test WITH (FORCE);`
  await prisma.$executeRaw`SELECT 'CREATE DATABASE test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test');`
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
createTestDb()
