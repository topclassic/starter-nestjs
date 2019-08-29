import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { loader } from './utils/loader';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_DB_URI'),
        useNewUrlParser: true,
      }),
    }),
    ...loader(__dirname, 'module.ts'),
  ],
})
export class AppModule {}
