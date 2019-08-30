import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { loader } from '../utils/loader';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: loader(__dirname, 'controller.ts'),
  providers: [
    ...loader(__dirname, 'service.ts'),
    ...loader(__dirname, 'resolver.ts'),
  ],
})
export class UserModule {}
