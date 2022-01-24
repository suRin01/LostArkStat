import { Test } from '@nestjs/testing';
import { Request } from 'express';
import { PostController } from "../../controller/post.controller"
import { ExecutionResult } from "../../dto/executionResult.dto";
import { PostService } from "../../service/post.service";
import * as nodeMock from "node-mocks-http"
import { Mapper } from '../../mapper/mapper';
import { ApplyService } from '../../service/apply.service';

import { applicants, jwtCookie, posts } from "../testData"

describe('PostController', () => {
  let postService: PostService;
  let postController: PostController;
  let applyService: ApplyService;

  const MockMapperRepository = ()=>({
	  mapper: jest.fn()
  })
  const MockApplyService = ()=>({
  	getApplicants: jest.fn()
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
		imports: [],
        controllers: [PostController],
        providers: [PostService, {
		    	provide: Mapper,
		    	useValue: MockMapperRepository
		    },
		    {
		    	provide: ApplyService,
		    	useValue: MockApplyService
		    }],
      }).compile();

      postService = moduleRef.get<PostService>(PostService);
      postController = moduleRef.get<PostController>(PostController);
      applyService = moduleRef.get<ApplyService>(ApplyService);

	  applyService.getApplicants = jest.fn().mockResolvedValue(applicants)
	  
  });

  describe('findAll', () => {
    it('should return posts array', async () => {
		const mockRequestObject:Request = nodeMock.createRequest();
		mockRequestObject.res = nodeMock.createResponse();
		mockRequestObject.headers.cookie = jwtCookie;
		const postResult:ExecutionResult = posts;

		jest.spyOn(postService, 'getPosts').mockResolvedValue(postResult);

		expect(await postController.getPosts(mockRequestObject)).toEqual(postResult);
    });
  });
});