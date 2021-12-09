import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppRepository } from './repositories/app.repository';

@Injectable()
export class AppService {
  constructor(private appRepository: AppRepository) {}
  getHello(): string {
    return 'Hello World TT !!!';
  }

  async deleteScoreCollection() {
    return await this.appRepository.deleteScoreCollection();
  }
  async deleteProgressCollection() {
    return await this.appRepository.deleteProgressCollection();
  }
  async deleteUsersCollection() {
    return await this.appRepository.deleteUsersCollection();
  }
  async deleteAllCollections() {
    const s = await this.appRepository.deleteScoreCollection();
    const p = await this.appRepository.deleteProgressCollection();
    const u = await this.appRepository.deleteUsersCollection();
    if (s && p && u) {
      return 'DB deleted.';
    }
    throw new InternalServerErrorException();
  }
}
