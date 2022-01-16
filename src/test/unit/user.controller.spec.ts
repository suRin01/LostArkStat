import { UserController } from "../../controller/user.controller"
import { UserServcie } from "../../service/user.service"
import { Test } from '@nestjs/testing';
import { StatusCode } from "src/common/statusCode";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { createUserDTO } from "src/dto/createUser.dto";

describe('UserController', () => {
    let userController: UserController;
    let userService: UserServcie;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
          controllers: [UserController],
          providers: [UserServcie],
        }).compile();

        userService = moduleRef.get<UserServcie>(UserServcie);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe('findOne', () => {
        it('should return one user array', async () => {
            const result:ExecutionResult = {
                status: StatusCode.OK,
                data: [{
                    user_idx: 9, 
                    id: "test", 
                    name:"test", 
                    password:"$2b$10$wrnUXIcbIdyId6/BlcCapOzO.uAt81jq7zrIkSvtiZhFhytVzXnKm", 
                    email: "test@example.com", 
                    phoneNumber:"010-0000-0000", 
                    birthDate: new Date(),
                    gender:"M", 
                    createdAt: new Date(),
                    mainCharacter:"test", 
                    salt: "$2b$10$wrnUXIcbIdyId6/BlcCapO", 
                    is_deleted:false, 
                    guildName:"test"
                    }]
                }
            jest.spyOn(userService, 'getUser').mockResolvedValue(result);
        
            expect(await userController.getUser("test")).toEqual(result);
        });
    });

    describe("createOne", ()=>{
        it("make one user", async ()=>{
            const user: createUserDTO = {
                name: "test",
                id:"testId",
                gender: "M",
                password: "test123",
                phoneNumber: "010-0000-0000",
                email:"test@example.com",
                birthDate: new Date(),
                mainCharacter: "testCharacter",
                guildName: "testGuild"
            }
            const result: ExecutionResult = {
                status: StatusCode.OK,
                data: [],
                affectedRow: 11
            }
            jest.spyOn(userService, "createUser").mockResolvedValue(result);

            expect(await userController.createUser(user)).toEqual(result);
        })
    })
});