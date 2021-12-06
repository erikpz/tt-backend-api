import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}
  @Get('best-scores')
  getBestScores(@Query('level') level: number) {
    return this.scoreService.getBestScores(+level !== NaN ? +level : undefined);
  }
  @Get(':userId')
  getScoresByUserId(@Param('userId') userId: string, @Query("level") level: number) {
    level = +level !== NaN ? +level : undefined
    return this.scoreService.getScoresByUserId(userId, level);
  }
  @Post(':userId')
  createScoreByUserId(
    @Param('userId') userId: string,
    @Body() createScoreDto: CreateScoreDto,
  ) {
    return this.scoreService.createScoreByUserId(userId, createScoreDto);
  }
}
