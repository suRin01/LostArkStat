import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Req,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostService } from "../service/post.service";
import { dataCasting } from "src/util/response.util";
import { ImageObject, PostObject } from "src/model/postData.model";
import { RequestUtility } from "src/util/req.util";
import { CommentService } from "src/service/comment.service";
import { PostDTO } from "src/dto/post.dto";
import { ImageService } from "src/service/image.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";
import { LikeService } from "src/service/like.service";
import { LikeUser } from "src/dto/likeUser.dto";

@Controller("api/posts")
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly commentService: CommentService,
		private readonly imageService: ImageService,
		private readonly likeService: LikeService,
	) {}

	@Get("/")
	async getPosts(@Query("offset") offset: number): Promise<PostObject[]> {
		const result = await this.postService.getPosts(offset);

		for (let idx = 0, len = result.data.length; idx < len; idx++) {
			const post: PostDTO = result.data[idx] as PostDTO;
			//코멘트 갯수 삽입
			(result.data[idx] as PostDTO).comments = (
				await this.commentService.getComments(post._id.toString())
			).data.length;

			//이미지 배열 삽입
			const imageArray = (await this.imageService.getImages(post._id))
				.data as ImageObject[];

			(result.data[idx] as PostDTO).Images = imageArray.map(
				(image) => image.path,
			);

			//좋아요 누른 유저 리스트 삽입
			(result.data[idx] as PostDTO).Like = (
				await this.likeService.getLikes(post._id)
			).data as LikeUser[];
		}

		return dataCasting.toPostData(result);
	}

	@Get("/:idx")
	async getPost(@Param("idx") idx: string): Promise<PostObject[]> {
		const result = await this.postService.getPost(idx);

		return dataCasting.toPostData(result);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	@UseInterceptors(
		FilesInterceptor("images", 10, {
			storage: diskStorage({
				destination: "./public/images",
				filename: (req, file, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join("");
					cb(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	async createPost(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() post: { content: string },
		@Req() req,
	): Promise<ExecutionResult> {
		console.debug(files);
		console.debug(post);

		const jwtTokenData: string = RequestUtility.fromAuthCookie()(req);
		const userData = RequestUtility.parseJwt(jwtTokenData);

		const createPostResult = await this.postService.createPost({
			user_id: Number(userData.sub),
			content: post.content,
		});

		const createImagesResult = await this.imageService.createImages(
			createPostResult.affectedRow,
			files.map((file) => file.filename),
		);

		return createImagesResult;
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete("/:idx")
	async deletePost(
		@Param("idx") idx: string,
		@Req() req,
	): Promise<ExecutionResult> {
		const jwtTokenData: string = RequestUtility.fromAuthCookie()(req);
		const userData = RequestUtility.parseJwt(jwtTokenData);

		console.debug(userData, idx);

		return await this.postService.deletePost(idx, Number(userData.sub));
	}
}
