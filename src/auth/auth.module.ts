import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { loader } from '../utils/loader';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule, UserModule, ConfigModule],
  controllers: loader(__dirname, /^(controller)\.(js|ts)$/),
  providers: [
    ...loader(__dirname, /^(service)\.(js|ts)$/),

    {
      inject: ['REDIS_CONNECTION'],
      provide: 'Redis',
      useFactory: connection => connection,
    },
  ],
})
export class AuthModule {}
