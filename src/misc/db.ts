import { connect } from "mongoose";
import Bot from "../main";
import { config } from "dotenv";
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
}
