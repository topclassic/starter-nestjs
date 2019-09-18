import { Injectable, Inject } from '@nestjs/common';
import { of, Observable } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(@Inject('Redis') private readonly redis) {}
  login(body): Observable<String> {
    this.redis.set('test_key', 'OK Krub');
    this.redis.get('test_key', function(err, reply) {
      console.log('reply', reply.toString());
    });
    return of(body);
  }
}
