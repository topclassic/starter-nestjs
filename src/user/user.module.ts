import { Module } from '@nestjs/common';
import { loader } from '../utils/loader';
import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: loader(__dirname, 'controller.ts'),
  providers: [
    ...loader(__dirname, 'service.ts'),
    ...loader(__dirname, 'resolver.ts'),
    {
      inject: ['MONGO_CONNECTION'],
      provide: 'User',
      useFactory: (connection: Connection) =>
        connection.model('User', UserSchema),
    },
  ],
})
export class UserModule {}
