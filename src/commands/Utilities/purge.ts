import Command from "../command";
import { MessageArgs, ParsedArg } from "../args";

// * Delete messages from a server
module.exports = new Command(
	{
		name: "purge",
		aliases: ["delete"],
		category: "Utilities",
		description: {
			content: "Deletes messages from a server!",
			examples: ["purge"]
		},
		permissions: ["manageMessages"],
		args: [
			{
				id: "amount",
				valid: ({ arg }: ParsedArg): boolean =>
					!isNaN(parseInt(arg)) && parseInt(arg) >= 1 && parseInt(arg) <= 10000,
				description: "1|10000",
				required: true
			}
		],
		cd: 1e4
	},

	async ({ bot, message, args }: MessageArgs): Promise<void> => {
		message.delete();

		message.channel
			.purge(parseInt(args[0]) + 1)
			.catch((err: any) =>
				message.channel.createMessage(bot.utils.error(err.toString(), message))
			);
	}
);
