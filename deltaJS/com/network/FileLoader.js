

FileLoader.super = "delta.com.ObjectBase";

function FileLoader(params){
    Super(this, params);
}

FileLoader.properties = {
    trimFiles : true,
    cache : {
        enumerable : false,
        writable : false,
        configurable : false,
        type : Object
    },
    load : {
        enumerable : false,
        value : function load(url){
            if(this.cache[url] == null){
                if(this.trimFiles){
                    this.cache[url] = include.utils.loadFile(url).trim();
                }else{
                    this.cache[url] = include.utils.loadFile(url);
                }
            }
            return this.cache[url];
        }
    }
};


