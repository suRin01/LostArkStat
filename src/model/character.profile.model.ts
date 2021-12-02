import { IsArray, IsString } from "class-validator";

export class CharacterProfile {
	@IsArray()
	public readonly activeEngrave: ItemObject[];
	@IsString()
	public readonly characterName: string;
	@IsString()
	public readonly server: string;
	@IsString()
	public readonly guild: string;
	@IsString()
	public readonly characterClass: string;
	@IsString()
	public readonly characterTitle: string;
	@IsString()
	public readonly level: string;
	@IsString()
	public readonly itemLevel: string;
	@IsString()
	public readonly expeditionLevel: string;
	@IsString()
	public readonly duelLevel: string;
	@IsString()
	public readonly possessionLevel: string;
	@IsString()
	public readonly combatPower: string;
	@IsString()
	public readonly healthPoint: string;
	@IsString()
	public readonly criticalScore: string;
	@IsString()
	public readonly specializationScore: string;
	@IsString()
	public readonly suppressScore: string;
	@IsString()
	public readonly speedScore: string;
	@IsString()
	public readonly patienceScore: string;
	@IsString()
	public readonly skilledScore: string;
	@IsString()
	public readonly intelligence: string;
	@IsString()
	public readonly courage: string;
	@IsString()
	public readonly charming: string;
	@IsString()
	public readonly kindness: string;
	@IsString()
	public readonly island: string;
	@IsString()
	public readonly star: string;
	@IsString()
	public readonly heart: string;
	@IsString()
	public readonly picture: string;
	@IsString()
	public readonly mokoko: string;
	@IsString()
	public readonly expedition: string;
	@IsString()
	public readonly ignea: string;
	@IsString()
	public readonly leaf: string;

	public readonly hat: ItemObject;
	public readonly top: ItemObject;
	public readonly bottom: ItemObject;
	public readonly gloves: ItemObject;
	public readonly shoulder: ItemObject;
	public readonly weapon: ItemObject;
	public readonly necklace: ItemObject;
	public readonly earringOne: ItemObject;
	public readonly earringTwo: ItemObject;
	public readonly ringOne: ItemObject;
	public readonly ringTwo: ItemObject;
	public readonly abilityStone: ItemObject;
	public readonly abilityStoneStat: AbilityStoneStat;
	public readonly bracelet: ItemObject;
	public readonly engravement: EquippedEngraves;
} 

export class EquippedEngraves {
	public readonly first: ItemObject;
	public readonly second: ItemObject;
}

export class ItemObject {
	constructor(icon: string, name: string, stat: string = null, tier: string = null) {
		this.icon = icon;
		this.name = name;
		this.stat = stat;
		this.tier = tier;
	}
	@IsString()
	public readonly icon: string;
	@IsString()
	public readonly name: string;
	@IsString()
	public readonly stat: string;
	@IsString()
	public readonly tier: string;
}

export class AbilityStoneStat {
	@IsString()
	public readonly buffFirst: string;
	@IsString()
	public readonly buffSecond: string;
	@IsString()
	public readonly debuff: string;
}
