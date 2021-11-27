import * as mongo from 'mongodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { Progress } from 'src/interfaces/progress.interface';

@Injectable()
export class ProgressRepository {
  private readonly collection: mongo.Collection;

  constructor(@InjectDb() private readonly db: mongo.Db) {
    this.collection = this.db.collection('progress');
  }

  async getProgressByUserId(userId: string): Promise<Progress> {
    try {
      const result = await this.collection.findOne({ userId });
      return result as Progress;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async createProgressByUserId(userId: string) {
    try {
      const result = await this.collection.insertOne({
        level: 0,
        userId,
      });
      if (!result.acknowledged) {
        return null;
      }
      return { _id: result.insertedId, level: 0, userId };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async updateProgressByUserId(userId: string, newLevel: number) {
    try {
      const result = await this.collection.findOneAndUpdate(
        { userId },
        { $set: { level: newLevel } },
        { returnDocument: 'after' },
      );
      return result.value;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
