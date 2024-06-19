import prisma from './prisma'

export default async () => {
  console.log('---------------------- reset-db ----------------------')

  const tablenames = await prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  return prisma.$executeRawUnsafe(
    `TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`,
  )
}
