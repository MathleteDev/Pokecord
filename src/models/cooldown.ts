import { Document, model, Schema } from "mongoose";

export interface ICooldown extends Document {
	userID: string;
	command: string;
	createdAt: number;
}

export default model<ICooldown>(
	"Cooldown",
	new Schema({
		userID: {
			type: String,
			required: true
		},
		command: {
			type: String,
			required: true
		},
		createdAt: {
			type: Number,
			required: true
		}
	})
);
