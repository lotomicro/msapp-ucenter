import { Injectable } from '@nestjs/common';

@Injectable()
export class UcenterService {
  getHello(): string {
    return 'Hello World!';
  }
}
