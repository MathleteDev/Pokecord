import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
	userID: string;
	coins: number;
}

export default model<IUser>(
	"User",
	new Schema({
		userID: {
			type: String,
			required: true
		},
		coins: {
			type: Number,
			default: 0
		}
	})
);
