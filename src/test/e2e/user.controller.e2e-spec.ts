
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from 'src/modules/user.module';
import { UserServcie } from 'src/service/user.service';
import { ExecutionResult } from 'src/dto/executionResult.dto';
import { StatusCode } from 'src/common/statusCode';

describe('Get One User', () => {
  let app: INestApplication;
  const result:ExecutionResult = {
	  status: StatusCode.OK,
	  data: [{
		  user_idx: 9, 
		  id: "test", 
		  name:"test", 
		  password:"$2b$10$wrnUXIcbIdyId6/BlcCapOzO.uAt81jq7zrIkSvtiZhFhytVzXnKm", 
		  email: "test@example.com", 
		  phoneNumber:"010-0000-0000", 
		  birthDate: new Date(1997, 7, 28),
		  gender:"M", 
		  createdAt: new Date(2022, 1, 15, 12, 12, 44),
		  mainCharacter:"test", 
		  salt: "$2b$10$wrnUXIcbIdyId6/BlcCapO", 
		  is_deleted:false, 
		  guildName:"test"
		  }]
	  }
  let userService = { findOne: () => result };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserServcie)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET User`, () => {
    return request(app.getHttpServer())
      .get('/api/users/test')
      .expect(200)
      .expect({
        data: userService.findOne(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});