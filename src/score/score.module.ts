import { Module } from '@nestjs/common';
import { ScoreRepository } from 'src/repositories/score.repository';
import { UserModule } from 'src/user/user.module';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  imports: [UserModule],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
})
export class ScoreModule {}
