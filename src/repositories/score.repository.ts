import * as mongo from 'mongodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { Score } from 'src/interfaces/score.interface';

@Injectable()
export class ScoreRepository {
  private readonly collection: mongo.Collection;

  constructor(@InjectDb() private readonly db: mongo.Db) {
    this.collection = this.db.collection('score');
  }

  async getBestScores(level: number): Promise<any> {
    try {
      /*   const result = await this.collection
        .find(level ? { level } : undefined, { sort: { score: -1 } })
        .toArray(); */
      const result = await this.collection.aggregate([
        { $match: { level } },
        { $group: { _id: '$userId', score: { $max: '$score' } } },
        { $sort: { score: -1 } },
      ]);
      return result.toArray() as any;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getScoresByUserId(userId: string, level: number): Promise<Score[]> {
    try {
      const result = await this.collection
        .find(level ? { userId, level } : { userId }, { sort: { score: -1 } })
        .toArray();
      return result as Score[];
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async createScoreByUserId(userId: string, score: number, level: number) {
    try {
      const creationDate = new Date();
      const result = await this.collection.insertOne({
        userId,
        score,
        level,
        creationDate,
      });
      if (!result.acknowledged) {
        return null;
      }
      return { _id: result.insertedId, score, userId, level, creationDate };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
