import { Module } from '@nestjs/common';
import { loader } from '@utils/loader';

@Module({
  imports: [],
  controllers: [...loader(__dirname, /^(controller)\.(js|ts)$/)],
  providers: [...loader(__dirname, /^(service)\.(js|ts)$/)],
})
export class UserModule {}
