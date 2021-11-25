export class CharacterProfile{
	activeEngrave: ItemObject[];
	characterName: string;
	server: string;
	guild: string;
	characterClass: string;
	characterTitle: string;
	level: string;
	itemLevel: string;
	expeditionLevel: string;
	duelLevel: string;
	possessionLevel:string;

	combatPower: string;
	healthPoint: string;

	criticalScore: string;
	specializationScore: string;
	suppressScore: string;
	speedScore: string;
	patienceScore: string;
	skilledScore: string;

	intelligence: string;
	courage: string;
	charming: string;
	kindness: string;

	island: string;
	star: string;
	heart: string;
	picture: string;
	mokoko: string;
	expedition: string;
	ignea: string;
	leaf: string;

	hat: ItemObject;
	top: ItemObject;
	bottom: ItemObject;
	gloves: ItemObject;
	shoulder: ItemObject;
	weapon: ItemObject;
	necklace: ItemObject;
	earringOne: ItemObject;
	earringTwo: ItemObject;
	ringOne:ItemObject;
	ringTwo: ItemObject;
	abilityStone: ItemObject;
	abilityStoneStat: AbilityStoneStat;
	bracelet: ItemObject;

	engravement: EquippedEngraves;
};

export class EquippedEngraves{
	first: ItemObject;
	second: ItemObject
}

export class ItemObject{
	constructor(icon: string, name:string, stat:string = null, tier:string = null){
		this.icon = icon;
		this.name = name;
		this.stat = stat;
		this.tier = tier;
	}
	icon: string;
	name: string;
	stat: string;
	tier: string;
};

export class AbilityStoneStat{
	buffFirst: string;
	buffSecond: string;
	debuff: string;
};