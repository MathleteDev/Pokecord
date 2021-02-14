import { Schema, model } from "mongoose";
import IUser from "../interfaces/user";

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
