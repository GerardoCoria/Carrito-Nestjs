import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hola')
  newEndpoint() {
    return `Holandaaaaa`;
  }

  @Get(':id')
  recibirParams(@Param('id') id: string){
    return id;
  }
}
/**hasta clase 7 */
