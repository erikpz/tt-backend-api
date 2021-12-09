import * as mongo from 'mongodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { Progress } from 'src/interfaces/progress.interface';

@Injectable()
export class AppRepository {
  private readonly colProgress: mongo.Collection;
  private readonly colScore: mongo.Collection;
  private readonly colUsers: mongo.Collection;

  constructor(@InjectDb() private readonly db: mongo.Db) {
    this.colProgress = this.db.collection('progress');
    this.colScore = this.db.collection('score');
    this.colUsers = this.db.collection('users');
  }

  async deleteScoreCollection(): Promise<any> {
    try {
      const result = await this.colScore.deleteMany({});
      return { deletedCount: result.deletedCount };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteProgressCollection(): Promise<any> {
    try {
      const result = await this.colProgress.deleteMany({});
      return { deletedCount: result.deletedCount };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteUsersCollection(): Promise<any> {
    try {
      const result = await this.colUsers.deleteMany({});
      return { deletedCount: result.deletedCount };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
