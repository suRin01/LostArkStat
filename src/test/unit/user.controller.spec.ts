import { UserController } from "../../controller/user.controller"
import { UserServcie } from "../../service/user.service"
import { Test } from '@nestjs/testing';
import { Mapper } from '../../mapper/mapper';
import { newUser, user, userCreationResult } from "../testData"

const MockMapperRepository = ()=>({
    mapper: jest.fn()
})

describe('UserController', () => {
    let userController: UserController;
    let userService: UserServcie;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
          controllers: [UserController],
          providers: [UserServcie, {
			provide: Mapper,
			useValue: MockMapperRepository
		}],
        }).compile();

        userService = moduleRef.get<UserServcie>(UserServcie);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe('findOne', () => {
        it('should return one user array', async () => {
            jest.spyOn(userService, 'getUser').mockResolvedValue(user);
        
            expect(await userController.getUser("test")).toEqual(user);
        });
    });

    describe("createOne", ()=>{
        it("make one user", async ()=>{
            jest.spyOn(userService, "createUser").mockResolvedValue(userCreationResult);

            expect(await userController.createUser(newUser)).toEqual(userCreationResult);
        })
    })
});