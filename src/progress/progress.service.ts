import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProgressRepository } from 'src/repositories/progress.repository';

@Injectable()
export class ProgressService {
  constructor(private progressRepositoy: ProgressRepository) {}

  async createProgressByUserId(userId: string) {
    const result = await this.progressRepositoy.createProgressByUserId(userId);
    if (!result) {
      return new InternalServerErrorException();
    }
    return result;
  }

  async getProgressByUserId(userId: string) {
    const progress = await this.progressRepositoy.getProgressByUserId(userId);
    if (!progress) throw new NotFoundException();
    return progress;
  }

  async updateProgressByUserId(userId: string, newLevel: number) {
    const newProgress = await this.progressRepositoy.updateProgressByUserId(
      userId,
      newLevel,
    );
    if (!newProgress) throw new NotFoundException();
    return newProgress;
  }
}
