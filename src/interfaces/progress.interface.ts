import { ObjectId } from 'bson';

export interface Progress {
  _id: string | ObjectId;
  userId: string | ObjectId;
  level: number;
}
