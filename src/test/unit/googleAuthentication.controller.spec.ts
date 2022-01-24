import { Test } from "@nestjs/testing";

import * as nodeMock from "node-mocks-http"
import { UserModule } from "../../modules/user.module";
import { AuthModule } from "../../modules/auth.module";
import { GoogleAuthenticationService } from "../../service/googleAuthentication.service";
import { GoogleApis } from "googleapis";
import { GoogleAuthenticationController } from "../../controller/googleAuthentication.controller";

import { jwtCookie } from "../testData"

describe("GoogleAuthController", () => {
  let googleAuthService: GoogleAuthenticationService;
  let googleAuthController: GoogleAuthenticationController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
		imports: [UserModule, AuthModule],
		providers: [GoogleAuthenticationService, GoogleApis],
		controllers: [GoogleAuthenticationController],
      }).compile();

      googleAuthService = moduleRef.get<GoogleAuthenticationService>(GoogleAuthenticationService);
      googleAuthController = moduleRef.get<GoogleAuthenticationController>(GoogleAuthenticationController);
	  
  });

  describe("login", () => {
    it("should return posts array", async () => {
		const mockResponseObject = nodeMock.createResponse();


		const googleOauthToken = {
			code:"4/P7q7W91a-oMsCeLvIaQm6bTrgtp7",
			client_id:"your_client_id",
			client_secret:"your_client_secret",
			redirect_uri:"https%3A//oauth2.example.com/code",
			grant_type:"authorization_code",
		}

		jest.spyOn(googleAuthService, "getAccessToken");
		googleAuthService.getAccessToken = jest.fn().mockReturnValue(googleOauthToken);
		await googleAuthService.getAccessToken("testKey");
		await googleAuthController.login(mockResponseObject, "sampleCode");
		expect(mockResponseObject.cookie).toBe(jwtCookie);
    });
  });
});