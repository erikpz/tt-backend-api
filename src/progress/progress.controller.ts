import { Controller, Get, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}
  @Get(':userId')
  getProgressByUserId(@Param('userId') userId: string) {
    return this.progressService.getProgressByUserId(userId);
  }
}
