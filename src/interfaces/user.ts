import { Document } from "mongoose";

export default interface IUser extends Document {
	userID: string;
	coins: number;
}
