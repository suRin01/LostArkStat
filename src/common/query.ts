export class queryString {
	public static readonly findAll:string = "SELECT * FROM `LostArkStat`.`Users`;";
	public static readonly findOne:string = "SELECT * FROM `LostArkStat`.`Users` WHERE `id`=?;";
	public static readonly updateOne:string =
		"UPDATE `LostArkStat`.`User` SET `name` = ?, `password` = ?, `phoneNumber` = ?, `birthDate` = ?, `mainCharacter` = ? WHERE (`id` = ?);";
	public static readonly createOne:string =
		"INSERT INTO `LostArkStat`.`Users` (`name`, `id`, `password`, `phoneNumber`, `birthDate`, `gender`, `mainCharacter`, `salt`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)";

	public static readonly login:string = "SELECT * FROM `LostArtStat`.`Users` WHERE `id`";

	public static readonly deleteOne:string = "UPDATE `LostArkStat`.`User` SET `is_deleted` = true WHERE (`id` = ?);";

	public static readonly createOautOne:string = "INSERT INTO `LostArkStat`.`Users` (`name`, `id`, `email`, `is_oauth_register`) VALUES (?, ?, ? , `1`)";
}

// prepared
// secure coding = 보안?안전?한 코딩
// database 취약점 공격
// 1. database injection > OR 1=1; DROP DATABASE blabla;
// prepared 를 사용하면 ? 모든걸 순수 string => keyword (where, or, and)를 keyword로 해석 x
