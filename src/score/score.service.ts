import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { ScoreRepository } from 'src/repositories/score.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ScoreService {
  constructor(
    private scoreRepository: ScoreRepository,
    private userService: UserService,
  ) {}

  async getBestScores(level: number) {
    if(!level) return "Debes indicar el nivel a buscar"
    const scores = await this.scoreRepository.getBestScores(level);
    if (!scores) throw new NotFoundException();
    const scorePromises = scores.map((score: any) =>
      this.getScoresByUserId(score._id, level),
    );
    const scoreResults = await Promise.all(scorePromises);
    const uniqueScores = scoreResults.map((r: any) => r[0]);
    const usersPromises = uniqueScores.map((x: any) =>
      this.userService.getUserById(x.userId),
    );
    const users = await Promise.all(usersPromises);
    const result = uniqueScores.map((score: any, i: number) => ({
      ...score,
      username: users[i].username,
    }));
    return result;
  }

  async getScoresByUserId(userId: string, level: number) {
    const scores = await this.scoreRepository.getScoresByUserId(userId, level);
    if (!scores) throw new NotFoundException();
    return scores;
  }

  async createScoreByUserId(userId: string, createScoreDto: CreateScoreDto) {
    const scoreCreated = await this.scoreRepository.createScoreByUserId(
      userId,
      +createScoreDto.score,
      +createScoreDto.level,
    );
    if (!scoreCreated) throw new InternalServerErrorException();
    return scoreCreated;
  }
}
