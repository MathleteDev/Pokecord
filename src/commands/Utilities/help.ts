import { EmbedOptions } from "eris";
import Command from "../command";
import { MessageArgs, ParsedArg } from "../args";
import { stripIndents } from "common-tags";
import { config } from "dotenv";
config();

const CATEGORIES: Record<string, string> = {
	Utilities: "🛠️"
};

// * Shows information about commands
module.exports = new Command(
	{
		name: "help",
		aliases: ["information", "commands"],
		category: "Utilities",
		description: {
			content: "See info on certain commands!",
			examples: ["help", "help ping"]
		},
		permissions: ["sendMessages", "embedLinks"],
		args: [
			{
				id: "command",
				valid: ({ bot, arg }: ParsedArg): boolean =>
					bot.cmds.some(
						(cmd: Command) =>
							cmd.props.name === arg || cmd.props.aliases?.includes(arg)
					),
				required: false
			}
		]
	},

	async ({ bot, args }: MessageArgs): Promise<EmbedOptions | string | void> => {
		if (args.length) {
			const command: Command | undefined = bot.cmds.find(
				(cmd: Command) =>
					cmd.props.name === args[0] || cmd.props.aliases?.includes(args[0])
			);

			if (!command) return `No information found on the command \`${args[0]}\``;

			return {
				title: "📓 Help",
				description: stripIndents`
          ❯ **Command:** \`${command.props.name}\`${
					command.props.aliases
						? `\n❯ **Aliases:** ${command.props.aliases
								.sort()
								.map((alias: string) => `\`${alias}\``)
								.join(" ")}`
						: ""
				}
          ❯ **Description:** ${command.props.description.content}${
					command.props.permissions
						? `\n❯ **Permissions:** ${command.props.permissions
								.sort()
								.map((perm: string) => `\`${bot.utils.parseCamelCase(perm)}\``)
								.join(" ")}`
						: ""
				}
          ❯ **Category:** ${CATEGORIES[command.props.category]} ${
					command.props.category
				}
          ❯ **Usage:** \`${process.env.BOT_PREFIX}${bot.utils.getUsage(
					command
				)}\`
          ❯ **Examples:**\n${command.props.description.examples
						.map((example: string) => `\`${example}\``)
						.join("\n")}
        `
			};
		} else
			return {
				title: "📓 Help",
				description: `Type \`${process.env.BOT_PREFIX}help [ command ]\` to see more info on that command!`,
				fields: bot.categories.map((cat: string) => ({
					name: `${CATEGORIES[cat]} ${cat}`,
					value: bot.cmds
						.filter((cmd: Command) => cmd.props.category === cat)
						.map((cmd: Command) => `\`${cmd.props.name}\``)
						.join("\n")
				}))
			};
	}
);
