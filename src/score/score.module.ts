import { Module } from '@nestjs/common';
import { ScoreRepository } from 'repositories/score.repository';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
})
export class ScoreModule {}
