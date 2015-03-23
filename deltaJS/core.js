(function(){
    function include( nameSpace , relativePath){
        objectLoader = new include.ObjectLoader( nameSpace , relativePath );
        return objectLoader.load();
    }

    window.include = include; 
})();


(function(){
    function SynchronousFileLoader(url){
        this.url = url;
    }

    SynchronousFileLoader.prototype = {
        constructor : SynchronousFileLoader,
        url         : null,
        request     : null,

        load : function load(){
            var request = this.request = new XMLHttpRequest();
            request.open( 'GET', this.url, false);
            request.send();
            if(request.status != 200) throw new Error('Error loading ' + this.url + '. ' + request.statusText + '.');
            return request;
        }
    };

    SynchronousFileLoader.load = function(url){
        var synchronousFileLoader = new SynchronousFileLoader(url);
        return synchronousFileLoader.load();
    }

    function ObjectLoader(nameSpace, relativePath){
        this.nameSpace = nameSpace;
        this.relativePath = relativePath;
    }

    ObjectLoader.prototype = {
        constructor     : ObjectLoader,
        nameSpace       : null,
        relativePath    : null,
        relativeLevel   : null,
        parentNameSpace : null,
        url             : null,

        rebuildNameSpace : function rebuildNameSpace(){
            if(!this.relativePath) return;
            this.rebuildrelativePath();

            var
                relativePath        = this.relativePath,
                nameSpaceTokens     = this.nameSpace.split( /\./ ),
                relativeLevel       = this.relativeLevel
            ;

            while(relativeLevel--){
                nameSpaceTokens.pop();
            }

            this.nameSpace = nameSpaceTokens.join(".") + "." + relativePath;
        },

        rebuildrelativePath : function rebuildrelativePath(){
            var
                result = /^(\.+)([a-zA-Z].*)/.exec( this.relativePath )
            ;

            this.relativeLevel  = result[1].length - 1;
            this.relativePath   = result[2];
        },

        buildUrl : function buildUrl(){
            var 
                nameSpaceTokens = this.nameSpace.split( /\./ ),
                parentNameSpace = this.nameSpace.split( /\./ ),
                length          = nameSpaceTokens.length,
                headToken       = nameSpaceTokens[0],
                baseUrl         = ObjectLoader.nameSpaceUrlRelations[headToken]
            ;

            if(baseUrl == null){
                throw "Url for name space head token'" + headToken +
                    "' is not defined. Full name space: '" + this.nameSpace +
                    "'.\nPlease check if the namespace is right or use include.addNameSpace([head token], [url]) to fix this issue."
                ;
            }

            parentNameSpace.pop();
            this.parentNameSpace    = parentNameSpace.join('.');

            nameSpaceTokens.shift();
            this.url                = baseUrl + nameSpaceTokens.join('/') + '.js';
            
            this.objectName         = nameSpaceTokens[nameSpaceTokens.length-1]
        },

        loadCode : function loadCode( ){
            var
                synchronousFileLoader = new SynchronousFileLoader(this.url),
                request = synchronousFileLoader.load()
            ;
            this.code = request.responseText
        },

        processCode : function processCode(){
            var
                nameSpace   = this.nameSpace,
                objectName  = this.objectName,
                url         = this.url
            ;

            this.code =
                "//# sourceURL=" + url + ";\n" +
                "(function(){" +
                    '"use strict";' +
                    "typeof " + objectName + " != 'undefined' && (include.loadedObjects['" + nameSpace + "'] = "+ objectName + ");" + 
                    "var Super;" +
                    "var nameSpace = '" + this.nameSpace + "';" +
                    "var parentNameSpace = '" + this.parentNameSpace + "';\n" +
                    this.code + "\n" +
                    "    if(typeof " + objectName + " == 'undefined'){\n" +
                    "         throw 'Object " + objectName + " is not defined in " + url + "';\n" +
                    "    }\n" +
                    "    include.loadedObjects['" + nameSpace + "'] = "+ objectName + ";\n" + 
                    "    if(include.processClass){\n" +
                    "        include.processClass(" + objectName + ",'" + nameSpace + "');\n" +
                    "        if( " + objectName + ".Super ){\n" +
                    "            Super = " + objectName + ".Super;\n" + 
                    "        }\n" +
                    "    }\n" + 
                "})();"
            ;

            ObjectLoader.evalCode(this);
        },

        load : function load(){
            this.rebuildNameSpace();

            if(!ObjectLoader.loadedObjects[this.nameSpace]){
                this.buildUrl();
                this.loadCode();
                this.processCode();
            }

            return ObjectLoader.loadedObjects[this.nameSpace];
        }
    }

    ObjectLoader.addNameSpace = function(nameSpace, url){
        this.nameSpaceUrlRelations[nameSpace] = url;
    };

    include.loadedObjects = ObjectLoader.loadedObjects = {
        "delta.com.network.SynchronousFileLoader" : SynchronousFileLoader,
        "delta.com.network.ObjectLoader" : ObjectLoader,
    }

    ObjectLoader.nameSpaceUrlRelations = {
    }

    include.ObjectLoader = ObjectLoader;
})();

(function(){
    include.ObjectLoader.evalCode = function evalCode(){
        eval(arguments[0].code);
    };
})();


(function(){
    include.buildConfig = function buildConfig(){
        var
        attribute, tags = document.getElementsByTagName('script'),
        tag = tags[tags.length-1], oop, extentions,

        config = {
            src         : null,
            root        : null,
            redirect    : '/download/browsers.html'
        };
        
        for(attribute in config) config[attribute] = tag.getAttribute( attribute ) || config[attribute];
        if(!config.root) config.root = config.src.match(/(.*\/)(.*)/)[1];
        include.config = config;
    };

    include.buildConfig();

    include.nameSpaceUrlRelations = include.ObjectLoader.nameSpaceUrlRelations;

    include.addNameSpace = include.ObjectLoader.addNameSpace.bind(include.ObjectLoader);
    include.addNameSpace('delta', include.config.root);
    include.addNameSpace("root", "/");

    oop         = include('delta.core.oop');
    extentions  = include('delta.core.extentions');

    include.processClass = oop.processClass;

    include( "delta.com.customElement.load.LoadController" );

})();