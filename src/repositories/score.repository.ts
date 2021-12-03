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

  async getScoresByUserId(userId: string): Promise<Score[]> {
    try {
      const result = await this.collection
        .find({ userId }, { sort: { value: -1 } })
        .toArray();
      return result as Score[];
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getBestScores(amount: number): Promise<Score[]> {
    try {
      const result = await this.collection
        .find({}, { limit: amount, sort: { score: -1 } })
        .toArray();
      return result as Score[];
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async createScoreByUserId(userId: string, score: number) {
    try {
      const creationDate = new Date();
      const result = await this.collection.insertOne({
        userId,
        score,
        creationDate,
      });
      if (!result.acknowledged) {
        return null;
      }
      return { _id: result.insertedId, score, userId, creationDate };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
