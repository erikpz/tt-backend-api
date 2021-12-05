import { ObjectId } from 'bson';

export interface Score {
  _id: ObjectId;
  score: number;
  level: number;
  userId: string;
  creationDate: Date | string;
}
