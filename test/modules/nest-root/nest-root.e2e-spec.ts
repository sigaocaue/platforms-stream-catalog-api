import { NestRootModule } from '@modules/nest-root/nest-root.module';
import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('nest-root', () => {
  let app: NestExpressApplication;
  let url: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NestRootModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('/', () => {
    beforeEach(() => {
      url = '/';
    });

    it('should verify that the HTTP response status is 204', async () => {
      await request(app.getHttpServer()).get(url).expect(HttpStatus.NO_CONTENT);
    });
  });

  describe('/health', () => {
    beforeEach(() => {
      url = '/health';
    });

    it('should verify that the HTTP response status is 200', async () => {
      await request(app.getHttpServer()).get(url).expect(HttpStatus.OK);
    });
  });
});
