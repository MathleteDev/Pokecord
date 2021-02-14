import { readdirSync } from "fs";
import { join } from "path";
import { Base } from "eris-sharder";
import { Client } from "eris";
import Command from "./commands/command";
import Utils from "./misc/utils";
import DB from "./misc/db";
import ReactionHandler from "./misc/reactionHandler";

// ! FIXED: ./node_modules/eris-sharder/src/sharding/cluster.js:261
// ! "Your code has not been loaded! This is due to it not extending the Base class. Please extend the Base class!"
// ! Added line: if (app.default !== undefined) app = app.default;

// * Main bot class
export default class Bot extends Base {
	public cmds: Command[] = [];
	public categories: string[] = readdirSync(join(__dirname, "commands")).filter(
		(dir: string) => !dir.endsWith(".js")
	);
	public utils: Utils = new Utils(this);
	public db: DB = new DB(this);
	public reactionHandler: ReactionHandler = new ReactionHandler();
	public colors: Record<string, number> = {
		blue: 0x0066ff,
		green: 0x00ff00,
		red: 0xff0000
	};

	public constructor(client: { bot: Client; clusterID: number }) {
		super(client);
	}

	public launch(): void {
		this.loadEvents();
		this.loadCommands();
		this.RefreshStatus();

		console.log("Bot is online!");
	}

	public RefreshStatus(): void {
		this.bot.editStatus("dnd", {
			name: `p!help !`,
			type: 0
		});
	}

	private loadEvents(): void {
		readdirSync(join(__dirname, "events")).forEach((file: string) => {
			const pull: any = require(`./events/${file}`);

			this.bot.on(file.slice(0, file.length - 3), pull.handler.bind(this));
		});
	}

	private loadCommands(): void {
		readdirSync(join(__dirname, "commands"))
			.filter((folder: string) => !folder.endsWith(".js"))
			.forEach((folder: string) => {
				readdirSync(join(__dirname, "commands", folder))
					.filter((file: string) => file.endsWith(".js"))
					.forEach((file: string) => {
						const pull: Command = require(`./commands/${folder}/${file}`);

						this.cmds.push(pull);
					});
			});
	}
}
