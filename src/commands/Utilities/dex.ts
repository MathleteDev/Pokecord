import Command from "../command";
import { MessageArgs, ParsedArg } from "../args";
import get from "axios";
import {
	AbilityInfo,
	Evolution,
	EvolutionChain,
	Pokemon,
	Species,
	StatInfo,
	TypeInfo
} from "../../misc/pokeapi";
import { AdvancedMessageContent, EmbedOptions } from "eris";
import { stripIndents } from "common-tags";

const BASE_STATS: string[] = [
	"HP",
	"Attack",
	"Defense",
	"Sp. Atk",
	"Sp. Def",
	"Speed"
];

interface EvolutionData {
	name: string;
	level: number;
}

// * Get info on a Pokémon
module.exports = new Command(
	{
		name: "dex",
		aliases: ["pokedex", "pokédex"],
		category: "Utilities",
		description: {
			content: "Get info on a Pokémon!",
			examples: ["dex pikachu"]
		},
		permissions: ["sendMessages", "embedLinks"],
		args: [
			{
				id: "pokémon",
				valid: (_: ParsedArg): boolean => true,
				required: true
			}
		]
	},

	async ({
		bot,
		message,
		args
	}: MessageArgs): Promise<AdvancedMessageContent | EmbedOptions | void> => {
		const res: any = await bot.utils.getPokemon(args[0]);
		if (!res)
			return bot.utils.error(
				`Could not find information on the pokémon \`${args[0]}\`. (Maybe you spelled its name wrong?)`,
				message
			);

		const pokemon: Pokemon = res.data;

		const speciesRes: any = await bot.utils.getSpecies(pokemon.id.toString());
		if (!speciesRes)
			return bot.utils.error(
				`Could not find information on the species \`${args[0]}\`. (Maybe you spelled its name wrong?)`,
				message
			);

		const species: Species = speciesRes.data;

		const evolutionRes: any = await get(
			species.evolution_chain.url
		).catch(() => {});
		if (!evolutionRes)
			return bot.utils.error(
				`Could not find information on the evolution chain of \`${args[0]}\`. (Maybe you spelled its name wrong?)`,
				message
			);

		const evolution: EvolutionChain = evolutionRes.data;

		let evoChain: EvolutionData[] = [];
		let evoData: Evolution = evolution.chain;
		let notEvolved: boolean = false;

		while (!!evoData) {
			const evoDetails = evoData.evolution_details[0];

			if (notEvolved)
				evoChain.push({
					name: evoData.species.name,
					level: !evoDetails ? 1 : evoDetails.min_level
				});
			if (evoData.species.name === pokemon.name) notEvolved = true;

			evoData = evoData.evolves_to[0];
		}

		const abilities: string[] = pokemon.abilities
			.filter((ability: AbilityInfo) => !ability.is_hidden)
			.map((ability: AbilityInfo) =>
				bot.utils.dashCapitalize(ability.ability.name)
			);
		const hidden: string[] = pokemon.abilities
			.filter((ability: AbilityInfo) => ability.is_hidden)
			.map((ability: AbilityInfo) =>
				bot.utils.dashCapitalize(ability.ability.name)
			);

		return {
			title: `📘 Pokédex | #${pokemon.id} | ${bot.utils.dashCapitalize(
				pokemon.name
			)}`,
			description: evoChain.length
				? `It ${evoChain
						.map(
							(data: EvolutionData) =>
								`evolves into ${bot.utils.dashCapitalize(
									data.name
								)} starting at level ${data.level}`
						)
						.join(",\nwhich ")}!`
				: undefined,
			fields: [
				{
					name: "Base Stats",
					value: pokemon.stats
						.map(
							(stat: StatInfo, i: number) =>
								`**${BASE_STATS[i]}:** ${stat.base_stat}`
						)
						.join("\n"),
					inline: true
				},
				{ name: "Height", value: `${pokemon.height / 10}m`, inline: true },
				{ name: "Weight", value: `${pokemon.weight / 10}kg`, inline: true },
				{
					name: `Type${pokemon.types.length === 1 ? "" : "s"}`,
					value: pokemon.types
						.map((type: TypeInfo) => bot.utils.dashCapitalize(type.type.name))
						.join(" | "),
					inline: true
				},
				{
					name: `Abilit${pokemon.abilities.length === 1 ? "y" : "ies"}`,
					value: `${abilities.join(" | ")}${
						hidden.length ? `\nHidden: ${hidden.join(" | ")}` : ""
					}`,
					inline: true
				},
				{
					name: "Gender",
					value:
						species.gender_rate > -1
							? stripIndents`${100 - species.gender_rate * 12.5}% Male
						${species.gender_rate * 12.5}% Female`
							: "None",
					inline: true
				}
			],
			image: { url: pokemon.sprites.other["official-artwork"].front_default }
		};
	}
);
