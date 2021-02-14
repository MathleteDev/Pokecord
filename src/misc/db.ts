import { connect, Types } from "mongoose";
import Bot from "../main";
import { config } from "dotenv";
import User from "../models/user";
import IUser from "../interfaces/user";
config();
connect(process.env.DB_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log("Connected to MongoDB!");
		return null;
	})
	.catch((err: any) => console.log(err.toString()));

export default class DB {
	private bot: Bot;

	public constructor(bot: Bot) {
		this.bot = bot;
	}

	public async getUser(userID: string): Promise<IUser> {
		let res: IUser | void | null = await User.findOne({
			userID
		}).catch((err: any) => console.log(err));
		if (!res) {
			const user: IUser = new User({
				_id: new Types.ObjectId(),
				userID
			});
			user.save().catch((err: any) => console.log(err));
			res = user;
		}
		return res;
	}

	public async addCoins(userID: string, amount: number): Promise<void> {
		const user: IUser = await this.getUser(userID);
		user.coins += amount;
		user.save().catch((err: any) => console.log(err));
	}
}
