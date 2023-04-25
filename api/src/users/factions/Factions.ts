// https://www.npmjs.com/package/unique-username-generator
import { uniqueUsernameGenerator, Config } from 'unique-username-generator';
import { QuestionsDto } from '../dto/create-user.dto';
import { Element } from 'src/elements/entities/element.entity';

export class Factions {

	// Get user Faction based on questionaire responses
	identifyUser(questions: QuestionsDto) {
		let water = 0;
		let desert = 0;
		let forest = 0;
		let cosmos = 0;

		switch (questions.question1) {
			case 1:
				water+=2;desert+=4;forest+=3;cosmos+=1;
				break;
			case 2:
				water+=3;desert+=4;forest+=1;cosmos+=2;
				break;
			case 3:
				water+=1;desert+=3;forest+=2;cosmos+=4;
				break;
			case 4:
				water+=3;desert+=1;forest+=4;cosmos+=2;
				break;
		}

		switch (questions.question2) {
			case 1:
				water+=2;desert+=1;forest+=3;cosmos+=4;
				break;
			case 2:
				water+=4;desert+=1;forest+=3;cosmos+=2;
				break;
			case 3:
				water+=2;desert+=4;forest+=3;cosmos+=1;
				break;
			case 4:
				water+=4;desert+=1;forest+=2;cosmos+=3;
				break;
		}

		switch (questions.question3) {
			case 1:
				water+=4;desert+=2;forest+=1;cosmos+=3;
				break;
			case 2:
				water+=1;desert+=4;forest+=3;cosmos+=2;
				break;
			case 3:
				water+=1;desert+=4;forest+=3;cosmos+=2;
				break;
			case 4:
				water+=3;desert+=2;forest+=1;cosmos+=4;
				break;
		}

		switch (questions.question4) {
			case 1:
				water+=4;desert+=2;forest+=1;cosmos+=3;
				break;
			case 2:
				water+=1;desert+=4;forest+=3;cosmos+=2;
				break;
			case 3:
				water+=2;desert+=3;forest+=4;cosmos+=1;
				break;
			case 4:
				water+=3;desert+=2;forest+=1;cosmos+=4;
				break;
		}

		switch (questions.question5) {
			case 1:
				water+=2;desert+=4;forest+=3;cosmos+=1;
				break;
			case 2:
				water+=1;desert+=2;forest+=4;cosmos+=3;
				break;
			case 3:
				water+=3;desert+=1;forest+=2;cosmos+=4;
				break;
			case 4:
				water+=4;desert+=1;forest+=3;cosmos+=2;
				break;
		}

		const sums = {
			water: water,
			desert: desert,
			forest: forest,
			cosmos: cosmos,
		}
		console.log('sum:', sums);

		const max: number = Math.max(water, desert, forest, cosmos);

		if (max < 14)
			return Element.UNKNOWN;

		let elements: number[] = [];
		if (max === water) {
			elements.push(Element.WATER);
		}
		if (max === desert) {
			elements.push(Element.DESERT);
		}
		if (max === forest) {
			elements.push(Element.FOREST);
		}
		if (max === cosmos) {
			elements.push(Element.COSMOS);
		}

		if (elements.length > 1)
			return Element.UNKNOWN;

		return elements[0];
	}

	waterPseudos = [
		"Aquarius",
		"Neptune",
		"Triton",
		"Poseidon",
		"Naiad",
		"Aqua",
		"Mariana",
		"Coral",
		"Azure",
		"Maelstrom",
		"Abyss",
		"Typhoon",
		"Splash",
		"Cascade",
		"Tidal",
		"Oceanus",
		"Hydro",
		"Aquamarine",
		"Seashell",
		"Seabreeze",
		"Riptide",
		"Fathom",
		"Whirlpool",
		"Salty",
		"Nautilus",
		"Seafoam",
		"Waterfall",
		"Mermaid",
		"Hydra",
	];
	
	desertPseudos = [
		"Mirage",
		"Cactus",
		"Dune",
		"Oasis",
		"Sandstorm",
		"Vulture",
		"Armadillo",
		"Scorpion",
		"Coyote",
		"Roadrunner",
		"Tumbleweed",
		"Salamander",
		"Hyena",
		"Rattlesnake",
		"Gila",
		"Javelina",
		"Gecko",
		"Hawk",
		"Lizard",
		"Jackrabbit",
		"Copper",
		"Mojave",
		"Mesa",
		"Sunset",
		"Saguaro",
		"Tortoise",
		"Badger",
		"Desperado",
		"Mesquite",
	];	

	forestPseudos = [
		"Evergreen",
		"Oakheart",
		"Thornbush",
		"Sylph",
		"Frostleaf",
		"Shadowgrove",
		"Fernweh",
		"Wildwood",
		"Mapleleaf",
		"Cedar",
		"Birchbark",
		"Silvershade",
		"Autumn",
		"Wisp",
		"Mossback",
		"Elmwood",
		"Bloom",
		"Grassblade",
		"Rowan",
		"Pinecone",
		"Juniper",
		"Druid",
		"Hollyhock",
		"Ivy",
		"Aspen",
		"Falconwing",
		"Sapling",
		"Sprout",
		"Willowisp",
	];
	
	cosmosPseudos = [
		"Nebula",
		"Orion",
		"Quasar",
		"Comet",
		"Starburst",
		"Supernova",
		"Lunatic",
		"Milkyway",
		"Meteor",
		"Galaxy",
		"Andromeda",
		"Eclipse",
		"Aurora",
		"Pulsar",
		"Cosmic",
		"Zodiac",
		"Celestial",
		"Gravity",
		"Astronomy",
		"Astrology",
		"Asteroid",
		"Nighthawk",
		"Solarflare",
		"Starlight",
		"Ursa",
		"Mercury",
		"Saturn",
		"Vega",
		"Nova",
	];

	unknownPseudos = [
		"Alexandra",
		"William",
		"Sophia",
		"Benjamin",
		"Isabella",
		"Christopher",
		"Charlotte",
		"Michael",
		"Emma",
		"Matthew",
		"Olivia",
		"David",
		"Ava",
		"Daniel",
		"Mia",
		"Andrew",
		"Ethan",
		"Emily",
		"Gabriel",
		"Abigail",
		"Grace",
		"Nathan",
		"Hannah",
		"Nicholas",
		"Samantha",
		"Liam",
		"Jacob",
		"Lucas",
		"Evelyn"
	];
	
	waterConfig: Config = {
		dictionaries: [this.waterPseudos],
		// separator: '',
		style: 'capital',
		// randomDigits: 3
	}
	desertConfig: Config = {
		dictionaries: [this.desertPseudos],
		// separator: '',
		style: 'capital',
		// randomDigits: 3
	}
	forestConfig: Config = {
		dictionaries: [this.forestPseudos],
		// separator: '',
		style: 'capital',
		// randomDigits: 3
	}
	cosmosConfig: Config = {
		dictionaries: [this.cosmosPseudos],
		// separator: '',
		style: 'capital',
		// randomDigits: 3
	}
	unknownConfig: Config = {
		dictionaries: [this.unknownPseudos],
		// separator: '',
		style: 'capital',
		// randomDigits: 3
	}

	configs = [this.waterConfig, this.desertConfig, this.forestConfig, this.cosmosConfig, this.unknownConfig];

	generatePseudo(elementId: number) {
		return uniqueUsernameGenerator(this.configs[elementId-1]);
	}

}
