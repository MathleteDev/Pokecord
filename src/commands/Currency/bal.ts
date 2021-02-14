import { EmbedOptions } from "eris";
import Command from "../command";
import { MessageArgs } from "../args";
import { IUser } from "../../models/user";

// * Get a user's balance
module.exports = new Command(
	{
		name: "bal",
		aliases: ["balance", "coins", "wallet"],
		category: "Currency",
		description: {
			content: "See how much money is in your wallet!",
			examples: ["bal"]
		},
		permissions: ["sendMessages", "embedLinks"]
	},

	async ({ bot, message }: MessageArgs): Promise<EmbedOptions> => {
		const user: IUser = await bot.db.getUser(message.author.id);

		return {
			title: "👛 Balance",
			description: `You have **${user.coins}** pokécoins!`
		};
	}
);
