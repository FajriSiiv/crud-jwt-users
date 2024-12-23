import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log(process.env.JWT_KEY, 'app module');
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
