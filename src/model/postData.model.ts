import { IsOptional, IsString } from "class-validator";
import { LikeUser } from "src/dto/likeUser.dto";

export class PostObject {
	@IsString()
	public readonly _id: string;
	public readonly content: string;
	public readonly createAt: Date;
	public readonly updatedAt: Date;
	public readonly User: User;
	public readonly Images: string[];
	public readonly Like: LikeUser[];
	public readonly Comment: number;
}

class User {
	public readonly _id: number;
	public readonly name?: string;
	public readonly Image?: ImageObject;
}

export class ImageObject {
	@IsOptional()
	public readonly _id?: string;
	public readonly path: string;
	public readonly post_id?: string;
}

/*
{
    id,
    content,
    createdAt,
    // 게시글을 작성한 유저
    User: {
      _id,
      name,
      // 게시글을 작성한 유저의 프로필 이미지
      Image: {
        path,
      },
    },
    // 게시글의 이미지
    Image: [
      {
        _id,
        path,
      },
      // ...
    ],
  },



*/
