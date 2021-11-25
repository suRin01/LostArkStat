export class JsonUtil {
	public jsonPathToValue(jsonData: Record<string, any>, path: string): Record<string, any> | string {
		if (!(jsonData instanceof Object) || typeof path === "undefined") {
			throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
		}
		path = path.replace(/\[(\w+)\]/g, ".$1");
		path = path.replace(/^\./, "");
		const pathArray: string[] = path.split(".");
		for (let idx = 0, len = pathArray.length, n = len; idx < n; ++idx) {
			const key: string = pathArray[idx];
			if (key in jsonData) {
				if (jsonData[key] !== null) {
					jsonData = jsonData[key];
				} else {
					return null;
				}
			} else {
				return key;
			}
		}
		return jsonData;
	}
}
