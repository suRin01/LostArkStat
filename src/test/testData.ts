import { createUserDTO } from "../dto/createUser.dto";
import JwtToken from "../model/jwt.token.model";
import { StatusCode } from "../common/statusCode";
import { ExecutionResult } from "../dto/executionResult.dto";


export const jwtCookie = "Refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiYWEiLCJpZHgiOjQsIm1haW5DaGFyYWN0ZXIiOiLrsoTtlITrp5vtipztloQiLCJndWlsZE5hbWUiOiLso7ztlZzrs7QiLCJpYXQiOjE2NDIyODQ2NTMsImV4cCI6MTY0Mjg4OTQ1M30.ZxCGxyH8dj9SNk_cCse896Yo6SesyKUTDjyXOmT4iT8; Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiYWEiLCJpZHgiOjQsIm1haW5DaGFyYWN0ZXIiOiLrsoTtlITrp5vtipztloQiLCJndWlsZE5hbWUiOiLso7ztlZzrs7QiLCJpYXQiOjE2NDIyODQ2NTMsImV4cCI6MTY0MjM3MTA1M30.PjJ2iX8TNhOxih0gZX7fG8X7AjSFtf0qQAEfKvffsYo;";

export const user:ExecutionResult = {
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
export const newUser: createUserDTO = {
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
export const userCreationResult: ExecutionResult = {
		status: StatusCode.OK,
		data: [],
		affectedRow: 11
	}

export const posts:ExecutionResult = {
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

export const applicants:ExecutionResult = {
	status: StatusCode.OK, 
	data: [{applicantClass: "바드", applicantId: "찾으시던바드"}, {applicantClass: "스카우터", applicantId: "찾던스카우터"}]
}


export const jwtTokenCookie:JwtToken = {
	Refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiYWEiLCJpZHgiOjQsIm1haW5DaGFyYWN0ZXIiOiLrsoTtlITrp5vtipztloQiLCJndWlsZE5hbWUiOiLso7ztlZzrs7QiLCJpYXQiOjE2NDIyODQ2NTMsImV4cCI6MTY0Mjg4OTQ1M30.ZxCGxyH8dj9SNk_cCse896Yo6SesyKUTDjyXOmT4iT8;",
	Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiYWEiLCJpZHgiOjQsIm1haW5DaGFyYWN0ZXIiOiLrsoTtlITrp5vtipztloQiLCJndWlsZE5hbWUiOiLso7ztlZzrs7QiLCJpYXQiOjE2NDIyODQ2NTMsImV4cCI6MTY0MjM3MTA1M30.PjJ2iX8TNhOxih0gZX7fG8X7AjSFtf0qQAEfKvffsYo;"
}

export const emptyCookie = {
	"Authorization":  {
		"options":  {
			"httpOnly": true,
		},
		"value": "",
	},
	"Refresh":  {
		"options":  {
			"httpOnly": true,
		},
		"value": "",
	}}