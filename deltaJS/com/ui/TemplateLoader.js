
var
    SynchronousFileLoader = include( "delta.com.network.SynchronousFileLoader" )
;

TemplateLoader.Super = "delta.com.objectBase.ObjectBase";

function TemplateLoader(params){
	Super(this, params);
	
}

TemplateLoader.properties = {
	templates : {
        type : Object
    },

    css : {
        type : Object
    },

    load : function build(viewNameSpace){
        if(this.templates[viewNameSpace] == null){
            this.loadTemplate(viewNameSpace);
        }
        var template = this.templates[viewNameSpace].toHtml();
        return template;
    },

	buildUrl : function buildUrl(viewNameSpace){
        var
            nameSpaceChain  = viewNameSpace.split('.'),
            headToken       = nameSpaceChain[0], url,
            baseUrl         = include.nameSpaceUrlRelations[ headToken ]
        ;

        if(baseUrl){
            nameSpaceChain.shift();
        }else{
            baseUrl = nameSpaceChain.shift() + '/';
        }

        url = baseUrl + nameSpaceChain.join('/') + '.template';
        return url;
    },

    loadTemplate : function loadTemplate(viewNameSpace){
        var
            url                     = this.buildUrl(viewNameSpace),
            request                 = SynchronousFileLoader.load(url),
            code                    = request.responseText,
            parts                   = code.split(/<\s*\/\s*style\s*>/),
            css, template
        ;

        template = code;
        if(parts.length > 1){
            css         = parts[0] + "</style>";
            template    = parts[1];
        }
        
        this.templates[viewNameSpace] = template;
        if(css){
            css = this.css[viewNameSpace] = css.toHtml();
            document.head.appendChild(css);
        }
    }
};


TemplateLoader.load = function load(viewNameSpace){
    if(this.instance == null){
        this.instance = new this();
    }
    return this.instance.load(viewNameSpace);
};