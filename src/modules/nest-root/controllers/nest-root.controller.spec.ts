import { NestRootController } from './nest-root.controller';

describe('NestRootController', () => {
  let controller: NestRootController;

  beforeEach(async () => {
    controller = new NestRootController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('main', () => {
    it('should return undefined', () => {
      expect(controller.main()).toEqual(undefined);
    });
  });
});
