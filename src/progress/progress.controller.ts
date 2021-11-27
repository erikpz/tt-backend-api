import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}
  @Get(':userId')
  getProgressByUserId(@Param('userId') userId: string) {
    return this.progressService.getProgressByUserId(userId);
  }
  @Put(':userId')
  updateProgressByUserId(
    @Param('userId') userId: string,
    @Body() body: { newLevel: number },
  ) {
    return this.progressService.updateProgressByUserId(userId, body.newLevel);
  }
}
