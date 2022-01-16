import { Test } from '@nestjs/testing';
import { Request } from 'express';
import { StatusCode } from "src/common/statusCode";
import { PostController } from 'src/controller/post.controller';
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostService } from "src/service/post.service";
import * as nodeMock from "node-mocks-http"
describe('CatsController', () => {
  let postService: PostService;
  let postController: PostController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PostController],
        providers: [PostService],
      }).compile();

      postService = moduleRef.get<PostService>(PostService);
      postController = moduleRef.get<PostController>(PostController);
  });

  describe('findAll', () => {
    it('should return posts array', async () => {
		const mockRequestObject:Request = nodeMock.createRequest();
		mockRequestObject.res = nodeMock.createResponse();
		mockRequestObject.headers.cookie = "Refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiYWEiLCJpZHgiOjQsIm1haW5DaGFyYWN0ZXIiOiLrsoTtlITrp5vtipztloQiLCJndWlsZE5hbWUiOiLso7ztlZzrs7QiLCJpYXQiOjE2NDIyODQ2NTMsImV4cCI6MTY0Mjg4OTQ1M30.ZxCGxyH8dj9SNk_cCse896Yo6SesyKUTDjyXOmT4iT8;Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiYWEiLCJpZHgiOjQsIm1haW5DaGFyYWN0ZXIiOiLrsoTtlITrp5vtipztloQiLCJndWlsZE5hbWUiOiLso7ztlZzrs7QiLCJpYXQiOjE2NDIyODQ2NTMsImV4cCI6MTY0MjM3MTA1M30.PjJ2iX8TNhOxih0gZX7fG8X7AjSFtf0qQAEfKvffsYo"
	
		const result:ExecutionResult = {
			status: StatusCode.OK,
			data: [{
				post_idx: 3,
				user_idx: 10,
				created_at: new Date(),
				updated_at: new Date(),
				date: new Date(),
				target: "1,3",
				constraint: "숙련",
				comment: "조건 없이 모여서 호딱 깹시다",
				commander: "1",
				guildName: "주한보"
			}]
		}
		jest.spyOn(postService, 'getPosts').mockResolvedValue(result);

		expect(await postController.getPosts(mockRequestObject)).toBe(result);
    });
  });
});