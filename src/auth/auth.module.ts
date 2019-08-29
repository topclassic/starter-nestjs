import { Module } from '@nestjs/common';
import { loader } from '../utils/loader';

@Module({
  controllers: loader(__dirname, 'controller.ts'),
  providers: loader(__dirname, 'service.ts'),
})
export class AuthModule {}
