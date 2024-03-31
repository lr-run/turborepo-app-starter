#!/usr/bin/env bash

tsx scripts/create-test-db.ts

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test" prisma migrate deploy

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test" PORT="8001" vitest --no-file-parallelism
