import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}
  @Get('best-scores')
  getBestScores(@Query() query) {
    return this.scoreService.getBestScores(query.amount ? +query.amount : 3);
  }
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
