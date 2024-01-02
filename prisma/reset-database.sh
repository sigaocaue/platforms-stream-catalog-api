#!/bin/bash
npx prisma format
npx prisma db push
npx prisma generate
echo "Database reset complete"
