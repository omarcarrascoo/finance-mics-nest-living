import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The Nest Living finance microservice is running!!';
  }
}
