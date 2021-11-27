import { ObjectId } from 'bson';

export interface Score {
  _id: ObjectId;
  puntaje: number;
  userId: string;
  creationDate: Date | string;
}
