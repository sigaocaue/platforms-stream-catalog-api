import { Config } from 'jest';
import { jestConfig } from '../jest.config';

export const jestE2eConfig: Config = {
  ...jestConfig,
  rootDir: '../',
  // modulePaths: ['<rootDir>/test'],
  testRegex: '.*e2e-spec.ts$',
  globalSetup: '<rootDir>/test/setup/global-e2e-setup.config.ts',
  globalTeardown: '<rootDir>/test/setup/global-e2e-teardown.config.ts',
};

export default jestE2eConfig;
