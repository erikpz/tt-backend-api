import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ScoreRepository } from 'src/repositories/score.repository';

@Injectable()
export class ScoreService {
  constructor(private scoreRepository: ScoreRepository) {}

  async createScoreByUserId(userId: string, score: number = 0) {
    const scoreCreated = await this.scoreRepository.createScoreByUserId(
      userId,
      score,
    );
    if (!scoreCreated) throw new InternalServerErrorException();
    return scoreCreated;
  }

  async getScoresByUserId(userId: string) {
    const scores = await this.scoreRepository.getScoresByUserId(userId);
    if (!scores) throw new NotFoundException();
    return scores;
  }

  async getBestScores(amount: number = 3) {
    const scores = await this.scoreRepository.getBestScores(amount);
    if (!scores) throw new NotFoundException();
    return scores;
  }
}
