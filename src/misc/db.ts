import { connect, Types } from "mongoose";
import Bot from "../main";
import { config } from "dotenv";
import User, { IUser } from "../models/user";
import Cooldown, { ICooldown } from "../models/cooldown";
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

	public async getCD(
		userID: string,
		command: string
	): Promise<ICooldown | void | null> {
		const res: ICooldown | void | null = await Cooldown.findOne({
			userID,
			command
		}).catch((err: any) => console.log(err));
		return res;
	}

	public async addCD(
		userID: string,
		command: string,
		createdAt: number
	): Promise<void> {
		const res: ICooldown | void | null = await this.getCD(userID, command);
		if (!res) {
			const cooldown = new Cooldown({ userID, command, createdAt });
			cooldown.save().catch((err: any) => console.log(err));
			return;
		}
		res.createdAt = createdAt;
		res.save().catch((err: any) => console.log(err));
	}
}
