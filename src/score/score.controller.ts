import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}
  @Get(':userId')
  getScoresByUserId(@Param('userId') userId: string) {
    return this.scoreService.getScoresByUserId(userId);
  }
  @Post(':userId')
  createScoreByUserId(
    @Param('userId') userId: string,
    @Body() createScoreDto: CreateScoreDto,
  ) {
    return this.scoreService.createScoreByUserId(userId, createScoreDto.score);
  }
}