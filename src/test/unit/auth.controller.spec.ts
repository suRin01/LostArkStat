import { Test } from "@nestjs/testing";
import { Request } from "express";

import * as nodeMock from "node-mocks-http"
import { StatusCode } from "../../common/statusCode";

import { AuthController } from "../../controller/auth.controller";
import { ExecutionResult } from "../../dto/executionResult.dto";
import { Mapper } from "../../mapper/mapper";
import { AuthService } from "../../service/auth.service";
import JwtToken from "../../model/jwt.token.model";
import { UserServcie } from "../../service/user.service";
import { LocalStrategy } from "../../strategy/local.strategy";
import { JwtStrategy } from "../../strategy/jwt.strategy";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import * as testData from "../testData"

const MockMapperRepository = ()=>({
    mapper: jest.fn()
})

describe("AuthController", () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
		imports: [PassportModule, JwtModule.register({
			secret: process.env.JWTSECRET,
			signOptions: { expiresIn: "5m" },
			})
		],
        controllers: [AuthController],
        providers: [AuthService, UserServcie, LocalStrategy, JwtStrategy, {
			provide: Mapper,
			useValue: MockMapperRepository
		}],
      }).compile();

      authService = moduleRef.get<AuthService>(AuthService);
      authController = moduleRef.get<AuthController>(AuthController);

	  moduleRef.get<UserServcie>(UserServcie).getUser = jest.fn().mockResolvedValue(testData.user);

  });

  describe("login", () => {
    it("should return posts array", async () => {
		const mockRequestObject:Request = nodeMock.createRequest();
		const mockResponseObject = nodeMock.createResponse();
		mockRequestObject.headers.cookie = testData.jwtCookie;


		const tokenResult:JwtToken = testData.jwtTokenCookie;
		const userResult:ExecutionResult = testData.user;

		jest.spyOn(authService, "validate").mockResolvedValue(userResult);
		
		//TODO: get useguard(authguard("jwt")) and apply


		await authController.login(mockRequestObject, mockResponseObject)

		console.debug(mockResponseObject);
		expect(mockResponseObject.cookie).toEqual(tokenResult);
    });
  });

  
  describe("logout", () => {
    it("remove all authentication cookie", async () => {
		const mockResponseObject = nodeMock.createResponse();
		mockResponseObject.cookie("Refresh",testData.jwtTokenCookie.Refresh);
		mockResponseObject.cookie("Authorization",testData.jwtTokenCookie.Authorization);

		await authController.logout(mockResponseObject)

		expect(mockResponseObject.cookies).toEqual(testData.emptyCookie);
    });
  });

});