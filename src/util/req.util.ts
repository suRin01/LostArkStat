export class RequestUtility {
	public static fromAuthCookie = () => {
		return (request): string => {
			let accessToken: string = null;
			if (request && request.headers.cookie) {
				const cookies = request.headers.cookie.split("; ").reduce((prev, current) => {
					const [name, ...value]: string = current.split("=");
					prev[name] = value.join("=");
					return prev;
				}, {});
				accessToken = cookies["Authorization"];
			}
			return accessToken;
		};
	};
	public static parseJwt (token:string):Record<string, string> {
		var base64Url:string = token.split('.')[1];
		var base64:string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload:string = decodeURIComponent(Buffer.from(base64, "base64").toString("binary").split('').map(function(character) {
			return '%' + ('00' + character.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	};

	// spring 기준
	// interceptor ?
	// request pre/post/close,end? > hooking
	
	// AOP > aspect object pro!!!~~~
	// mvc 
	// a 기능 > controller > service > db > return
	// b 기능 > controller > service > db > return
	// c 기능 > controller > service > db > return
	// aspect > 구체적으로 한 땀 한 땀 hooking 

}