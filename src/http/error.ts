import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  
  @Catch(HttpException)
  export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse();
      const status = exception.getStatus();
      res.type('application/json').code(status);
      res.send(exception.message);
    }
  }
  