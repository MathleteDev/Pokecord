// * Pokemon interface
export interface Pokemon {
	abilities: AbilityInfo[];
	base_experience: number;
	forms: NameURL[];
	game_indecies: GameIndex[];
	height: number;
	held_items: HeldItem[];
	id: number;
	is_default: true;
	location_area_encounters: string;
	moves: MoveInfo[];
	name: string;
	order: number;
	species: Species;
	sprites: Sprites;
	stats: StatInfo[];
	types: TypeInfo[];
	weight: number;
}

export interface NameURL {
	name: string;
	url: string;
}

export interface AbilityInfo {
	ability: NameURL;
	is_hidden: boolean;
	slot: number;
}

export interface GameIndex {
	game_index: number;
	version: NameURL;
}

export interface HeldItem {
	item: NameURL;
	version_details: VersionDetail[];
}

export interface VersionDetail {
	rarity: number;
	version: NameURL;
}

export interface MoveInfo {
	move: NameURL;
	version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: NameURL;
	version_group: NameURL;
}

export interface Sprites {
	back_default: string | null;
	back_female: string | null;
	back_shiny: string | null;
	back_shiny_female: string | null;
	front_default: string | null;
	front_female: string | null;
	front_shiny: string | null;
	front_shiny_female: string | null;
	other: ExtraSprites;
}

export interface ExtraSprites {
	dream_world: {
		front_default: string;
		front_female: string | null;
	};
	"official-artwork": {
		front_default: string;
	};
}

export interface StatInfo {
	base_stat: number;
	effort: 1;
	stat: NameURL;
}

export interface TypeInfo {
	slot: number;
	type: NameURL;
}

// * Species Interface
export interface Species {
	base_happiness: number;
	capture_rate: number;
	color: NameURL;
	egg_groups: NameURL[];
	evolution_chain: { url: string };
	evolves_from_species: NameURL;
	flavor_text_entries: FlavorText[];
	form_descriptions: any[];
	forms_switchable: boolean;
	gender_rate: number;
	genera: Genera[];
	generation: NameURL;
	growth_rate: NameURL;
	habitat: NameURL;
	has_gender_differences: boolean;
	hatch_counter: number;
	id: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	name: string;
	names: Name[];
	order: number;
	pal_park_encounters: Encounters[];
	pokedex_numbers: DexNumber[];
	shape: NameURL;
	varieties: Variety[];
}

export interface FlavorText {
	flavor_text: string;
	language: NameURL;
	version: NameURL;
}

export interface Genera {
	genus: string;
	language: NameURL;
}

export interface Name {
	language: NameURL;
	name: string;
}
export interface Encounters {
	area: NameURL;
	base_score: string;
	rate: 10;
}

export interface DexNumber {
	entry_number: number;
	pokedex: NameURL;
}

export interface Variety {
	is_default: boolean;
	pokemon: NameURL;
}

// * Evolution Chain Interface
export interface EvolutionChain {
	baby_trigger_item: NameURL;
	chain: Evolution;
	id: number;
}

export interface Evolution {
	evolution_details: any[];
	evolves_to: Evolution[];
	is_baby: boolean;
	species: NameURL;
}
