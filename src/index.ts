import { Master } from "eris-sharder";
import { config } from "dotenv";
config();

const _ = new Master(process.env.BOT_TOKEN!, "/dist/main.js", {
	stats: true,
	name: "Pokécord",
	clientOptions: {
		messageLimit: 0
	}
});
