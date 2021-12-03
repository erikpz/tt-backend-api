import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Score } from 'src/interfaces/score.interface';
import { ScoreRepository } from 'src/repositories/score.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ScoreService {
  constructor(
    private scoreRepository: ScoreRepository,
    private userService: UserService,
  ) {}

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

  async getBestScores(amount: number) {
    const scores = await this.scoreRepository.getBestScores(amount);
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
}
