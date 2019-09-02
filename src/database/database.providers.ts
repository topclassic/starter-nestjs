import { ConfigService } from '../config/config.service';
import * as mongoose from 'mongoose';
import * as redis from 'redis';

export const databaseProviders = [
  {
    provide: 'MONGO_CONNECTION',
    inject: [ConfigService],
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get('MONGO_DB_URI'), { useNewUrlParser: true }),
  },
  {
    provide: 'REDIS_CONNECTION',
    inject: [ConfigService],
    useFactory: (config: ConfigService): Promise<typeof redis> =>
      redis.createClient(config.get('REDIS_DB_URI')),
  },
];
