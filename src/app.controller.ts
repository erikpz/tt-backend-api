import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('app')
  deleteApp() {
    return this.appService.deleteAllCollections();
  }
  @Delete('app/score')
  deleteScore() {
    return this.appService.deleteScoreCollection();
  }
  @Delete('app/progress')
  deleteProgress() {
    return this.appService.deleteProgressCollection();
  }
  @Delete('app/users')
  deleteUsers() {
    return this.appService.deleteUsersCollection();
  }
}
