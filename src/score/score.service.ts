import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { Score } from 'src/interfaces/score.interface';
import { ScoreRepository } from 'src/repositories/score.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ScoreService {
  constructor(
    private scoreRepository: ScoreRepository,
    private userService: UserService,
  ) {}

  async getBestScores(level: number) {
    const scores = await this.scoreRepository.getBestScores(level);
    if (!scores) throw new NotFoundException();
    const userIdsFromScores = scores.map((score: Score) => score.userId);
    const usersPromises = userIdsFromScores.map((userId: string) =>
      this.userService.getUserById(userId),
    );
    const users = await Promise.all(usersPromises);
    let result: any = [];
    for (let i = 0; i < scores.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (scores[i].userId === users[j]._id.toString()) {
          result = [...result, { ...scores[i], username: users[j].username }];
        }
      }
    }
    result = result.map((r: any) => [JSON.stringify(r), r]);
    result = new Map(result);
    result = [...result.values()];
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
