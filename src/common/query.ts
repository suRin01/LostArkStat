export class userQueryString {
	public static readonly findAll:string = "SELECT * FROM `LostArkStat`.`Users`;";
	public static readonly findOne:string = "SELECT * FROM `LostArkStat`.`Users` WHERE `id`=?;";
	public static readonly updateOne:string =
		"UPDATE `LostArkStat`.`User` SET `name` = ?, `password` = ?, `phoneNumber` = ?, `birthDate` = ?, `mainCharacter` = ? WHERE (`user_idx` = ?);";
	public static readonly createOne:string =
		"INSERT INTO `LostArkStat`.`Users` (`name`, `id`, `password`, `phoneNumber`, `birthDate`, `gender`, `mainCharacter`, `salt`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)";

	public static readonly deleteOne:string = "UPDATE `LostArkStat`.`User` SET `is_deleted` = true WHERE (`user_idx` = ?);";

	public static readonly createOautOne:string = "INSERT INTO `LostArkStat`.`Users` (`name`, `user_idx`, `email`, `is_oauth_register`) VALUES (?, ?, ? ,?)";
}


export class postQueryString {
	public static readonly findAll = "SELECT * FROM `LostArkStat`.`Posts`;";
	public static readonly findOne =
		"select posts.*, users.profileImage, users.mainCharacter from LostArkStat.Posts as posts left join LostArkStat.Users as users ON users.user_idx = posts.user_idx where posts.is_deleted = 0 && posts.date > CURDATE() && posts.post_idx = ? order by posts.post_idx DESC;"
	public static readonly updateOne =
		"UPDATE `LostArkStat`.`Posts` SET `user_idx` = ? `content` = ? WHERE (`post_idx` = ?);";
	public static readonly createOne =
		"INSERT INTO `LostArkStat`.`Posts` (`user_idx`, `commander`, `target`, `date`, `constraint`, `comment`, `guildName`) VALUES (?, ?, ?, ?, ?, ?, ?);";
	public static readonly deleteOne =
		"UPDATE `LostArkStat`.`Posts` SET `is_deleted` = 1 WHERE (post_idx = ? && user_idx = ? );";
	public static readonly findPosts =
		"select posts.*, users.profileImage, users.mainCharacter from LostArkStat.Posts as posts left join LostArkStat.Users as users ON users.user_idx = posts.user_idx where posts.is_deleted = 0 && posts.date > CURDATE() && posts.guildName = ? order by posts.post_idx DESC;"
}

export class imageQueryString {
	public static readonly findAll =
		"select * from `LostArkStat`.`Images` where post_idx = ?;";
	public static readonly createOne =
		"insert into `LostArkStat`.`Images` (`post_idx`, `path`) values (?, ?);";
}

export class applyQueryString {
	public static readonly createOne =
		"insert into `LostArkStat`.`Applies` (`post_idx`, `user_idx`, `applicantClass`, `applicantId` ) values( ?, ?, ?, ?)";
	public static readonly deleteOne =
		"delete from `LostArkStat`.`Applies` where (`post_idx` = ? and `user_idx` = ?);";
	public static readonly findAll =
		"select `LostArkStat`.`Applies`.`applicantClass`, `LostArkStat`.`Applies`.`applicantId` from `LostArkStat`.`Applies` where (`post_idx` = ?);";
}
