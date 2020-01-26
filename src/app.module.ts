import { Module, Global } from '@nestjs/common';
import { loader } from './utils/loader';
import { ConfigModule } from '@config/config.module';
import { database, repository } from './app.provider';

@Global()
@Module({
  imports: [...loader(__dirname, /^(.+module)\.(js|ts)$/)],
  providers: [...database, ...repository],
  exports: [...database, ...repository, ConfigModule],
})
export class AppModule {}
