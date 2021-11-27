import { ObjectId } from "bson";

export interface User {
    username: string;
    email: string;
    _id: string | ObjectId
}