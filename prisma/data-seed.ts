import { PrismaClient } from '@prisma/client';
import * as glob from 'glob';
import path from 'path';
import { SeedInterface } from './seed';

const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.$connect();
  const seedersFiles = glob.sync(
    path.join(__dirname, 'seed', '**', '**/*.seed.+(ts|js)'),
  );

  for (const seederFile of seedersFiles) {
    const SeederClass = (await import(seederFile)).default;
    const seederInstance = new SeederClass(prismaClient) as SeedInterface;
    await seederInstance.seed();
    console.log(
      `O seed do arquivo ${seederFile.match(/[^/]*$/)?.shift()} foi executado.`,
    );
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
