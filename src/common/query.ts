export class userQueryString {
	public static readonly findAll:string = "SELECT * FROM `LostArkStat`.`Users`;";
	public static readonly findOne:string = "SELECT * FROM `LostArkStat`.`Users` WHERE `id`=?;";
	public static readonly updateOne:string =
		"UPDATE `LostArkStat`.`User` SET `name` = ?, `password` = ?, `phoneNumber` = ?, `birthDate` = ?, `mainCharacter` = ? WHERE (`user_idx` = ?);";
	public static readonly createOne:string =
		"INSERT INTO `LostArkStat`.`Users` (`name`, `user_idx`, `password`, `phoneNumber`, `birthDate`, `gender`, `mainCharacter`, `salt`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)";

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

export class commentQueryString {
	public static readonly findAll =
		"select A.*, B.username, B.profile_image from LostArkStat.Comments as A left join LostArkStat.Users as B using(user_idx) where A.post_idx = ? && A.is_deleted = 0 order by A.created_at;"; // 한 개의 포스터에 모든 댓글
	public static readonly updateOne =
		"UPDATE `LostArkStat`.`Comments` SET `user_idx` = ?, `post_idx` = ?, comment_id = ?, `comment_text` = ? WHERE (`comment_idx` = ?);";
	public static readonly createOne =
		"INSERT INTO `LostArkStat`.`Comments` (`user_idx`, `post_idx`,`parent_idx`, `content`) VALUES (?, ?, ?, ?);";
	public static readonly deleteOne =
		"UPDATE `LostArkStat`.`Comments` SET `is_deleted` = 1 WHERE ( comment_idx = ? and user_idx = ? );";
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
