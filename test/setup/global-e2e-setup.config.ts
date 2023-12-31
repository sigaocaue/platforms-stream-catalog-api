import { execSync } from 'child_process';
import * as process from 'process';

export default async () => {
  try {
    process.env.NODE_ENV = 'e2e-tests';
    const e2eMysqlPort = 3310;
    const e2eMysqlDatabase = 'e2e-stream-catalog';
    const e2eMysqlRootPassword = 'e2e-root';

    execSync(
      `docker run -d --name=e2e-mysql -p ${e2eMysqlPort}:3306 -e MYSQL_DATABASE=${e2eMysqlDatabase} -e MYSQL_ROOT_PASSWORD=${e2eMysqlRootPassword} "mysql:\${MYSQL_VERSION:-8}"`,
      { stdio: 'inherit' },
    );
    process.env.DATABASE_URL = `mysql://root:${e2eMysqlRootPassword}@localhost:${e2eMysqlPort}/${e2eMysqlDatabase}`;
    await new Promise((resolve) => setTimeout(resolve, 8000));
    execSync('npx prisma db push', { stdio: 'inherit' });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    execSync('npx prisma generate', { stdio: 'inherit' });
  } catch (e) {
    execSync('docker rm -f e2e-mysql', { stdio: 'inherit' });
    throw e;
  }
};
