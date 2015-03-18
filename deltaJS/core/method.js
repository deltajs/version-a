var method = { 
	getArguments : function getArguments(method) {
    	var s = method.toString();
    	return s.slice(s.indexOf('(')+1, s.indexOf(')')).match(/([^\s,]+)/g) || [];
	}
}

