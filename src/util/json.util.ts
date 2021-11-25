export class JsonUtil{
	public jsonPathToValue(jsonData, path:string) {
		if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
			throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
		}
		path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		path = path.replace(/^\./, ''); // strip a leading dot
		var pathArray = path.split('.');
		for (var i = 0, n = pathArray.length; i < n; ++i) {
			var key = pathArray[i];
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