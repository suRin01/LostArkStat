export const StatusCode = {
	// Error 100 ~ 149
	generalInternalError : 100,
	unauthorlized: 101,

	// DB 150 ~ 199
	DbConnectionRefuse: 150,
	DbExecutionFail: 151,

	// OK 200 ~ 299
	OK: 200,
	OkNoReturnData: 201,

	// Redirect
	Redirect: 302,
	
	// Internal Error 500
	InternalError: 500,
}