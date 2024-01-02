import { Module } from '@nestjs/common';
import { PersonController } from './controllers';
import { PersonService } from './services';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
