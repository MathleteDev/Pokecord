import { EmbedOptions } from "eris";
import Command from "../command";
import { MessageArgs } from "../args";
import IUser from "../../interfaces/user";

// * Gives a user 100 - 350 coins every day
module.exports = new Command(
	{
		name: "daily",
		aliases: ["dailyclaim"],
		category: "Currency",
		description: {
			content: "Get some coins evey 24 hours!",
			examples: ["daily"]
		},
		permissions: ["sendMessages", "embedLinks"]
	},

	async ({ bot, message }: MessageArgs): Promise<EmbedOptions> => {
		const gift: number = Math.floor(Math.random() * 250) + 100;
		await bot.db.addCoins(message.author.id, gift);

		return {
			title: "🎁 Daily",
			description: `You received **${gift}** pokécoins!`
		};
	}
);
