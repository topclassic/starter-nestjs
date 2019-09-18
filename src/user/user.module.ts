import { Module } from '@nestjs/common';
import { loader } from '../utils/loader';
import { Connection } from 'mongoose';
import { UserSchema } from './container/schema';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: loader(__dirname, /^(controller)\.(js|ts)$/),
  providers: [
    ...loader(__dirname, /^(service)\.(js|ts)$/),
    ...loader(__dirname, /^(resolver)\.(js|ts)$/),
    {
      inject: ['MONGO_CONNECTION'],
      provide: 'User',
      useFactory: (connection: Connection) =>
        connection.model('User', UserSchema),
    },
  ],
  exports: [...loader(__dirname, /^(.+service)\.(js|ts)$/)],
})
export class UserModule {}
