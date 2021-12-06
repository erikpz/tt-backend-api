import * as mongo from 'mongodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { ObjectId } from 'mongodb';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserRepository {
  private readonly collection: mongo.Collection;

  constructor(@InjectDb() private readonly db: mongo.Db) {
    this.collection = this.db.collection('users');
  }

  async getAll(): Promise<User[]> {
    try {
      const result = await this.collection.find({}).toArray();
      return result as User[];
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: string): Promise<User> {
    try {
      const objId = new ObjectId(id);
      const result = await this.collection.findOne({ _id: objId });
      return result as User;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      const result = await this.collection.findOne({ username });
      return result as User;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const result = await this.collection.insertOne(user);
      if (!result.acknowledged) {
        return null;
      }
      let newTask = { _id: result.insertedId, ...user };
      return newTask;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
