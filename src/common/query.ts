export class queryString {
	public static readonly findAll:string = "SELECT * FROM `LostArkStat`.`Users`;";
	public static readonly findOne = "SELECT * FROM `LostArkStat`.`Users` WHERE `id`=?;";
	public static readonly updateOne =
		"UPDATE `LostArkStat`.`User` SET `name` = ?, `password` = ?, `phoneNumber` = ?, `birthDate` = ?, `mainCharacter` = ? WHERE (`id` = ?);";
	public static readonly createOne =
		"INSERT INTO `LostArkStat`.`Users` (`name`, `id`, `password`, `phoneNumber`, `birthDate`, `gender`, `mainCharacter`, `salt`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)";
	// public static readonly deleteOne = "DELETE FROM `LostArkStat`.`Users` WHERE (`id` = ?);";

	public static readonly login = "SELECT * FROM `LostArtStat`.`Users` WHERE `id`";

	public static readonly deleteOne = "UPDATE `LostArkStat`.`User` SET `is_deleted` = true WHERE (`id` = ?);";
}
