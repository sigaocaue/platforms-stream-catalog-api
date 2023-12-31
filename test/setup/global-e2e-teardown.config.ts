import { execSync } from 'child_process';

export default async () => {
  execSync('docker rm -f e2e-mysql', { stdio: 'inherit' });
};
