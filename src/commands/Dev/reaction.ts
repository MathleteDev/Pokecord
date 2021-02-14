import { Emoji, Message, TextChannel } from "eris";
import Command from "../command";
import { MessageArgs } from "../args";
import { ReactionCollector } from "../../misc/reactionHandler";

// * Test reaction handler
module.exports = new Command(
	{
		name: "reaction",
		aliases: ["reactiontest"],
		category: "Dev",
		description: {
			content: "Test reaction handler",
			examples: ["reaction"]
		},
		permissions: ["sendMessages", "embedLinks"]
	},

	async ({ bot, message }: MessageArgs): Promise<void> => {
		let react: Message<TextChannel> = await message.channel.createMessage("1");
		let num: number = 1;

		react.addReaction("🏓");

		const filter = (userID: string, emoji: Emoji) =>
			userID === message.author.id && emoji.name === "🏓";

		const collector: ReactionCollector = bot.reactionHandler.awaitReactions(
			react,
			filter,
			{ time: 10000 }
		);

		collector.on("collect", (userID: string, emoji: Emoji) => {
			num += 1;
			react.removeReaction(emoji.name, userID);
			react.edit(num.toString());
		});

		collector.on("end", () => {
			react.removeReactionEmoji("🏓");
		});
	}
);
