import { Module } from '@nestjs/common';
import { loader } from '../utils/loader';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: loader(__dirname, 'controller.ts'),
  providers: [
    ...loader(__dirname, 'service.ts'),
    {
      inject: ['REDIS_CONNECTION'],
      provide: 'Redis',
      useFactory: connection => connection,
    },
  ],
})
export class AuthModule {}
