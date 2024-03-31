import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
await prisma.$executeRaw`DROP DATABASE IF EXISTS test WITH (FORCE);`
await prisma.$executeRaw`SELECT 'CREATE DATABASE test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test');`
