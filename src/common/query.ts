export class queryString {
	public static readonly findAll = "SELECT * FROM `LostArkStat`.`User`;";
	public static readonly findOne =
		"SELECT * FROM `LostArkStat`.`User` WHERE `id`=?;";
	public static readonly updateOne =
		"UPDATE `LostArkStat`.`User` SET `name` = ?, `password` = ?, `phoneNumber` = ?, `birthDate` = ?, `mainCharacter` = ? WHERE (`id` = ?);";
	public static readonly createOne =
		"INSERT INTO `LostArkStat`.`User` (`name`, `id`, `password`, `phoneNumber`, `birthDate`, `gender`, `mainCharacter`) VALUES (?, ?, ?, ?, ?, ?, ?)";
	public static readonly deleteOne =
		"DELETE FROM `LostArkStat`.`User` WHERE (`id` = ?);";

	public static readonly login =
		"SELECT * FROM `LostArtStat`.`User` WHERE `id`";
}
