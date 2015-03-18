
var WebMethod = include('delta.com.network.WebMethod');
WebMethodsBuilder.super = 'delta.com.ObjectBase';

function WebMethodsBuilder(params){
    Super(this, params);
    
    var parentObject = params["@parentObject"];
    if(parentObject && !this.eventBus){
        this.eventBus = parentObject.eventBus;
    }
}

WebMethodsBuilder.properties = {
    domain      : '/wsgi/ws/',
    nameSpace   : null,
    url         : null,
    eventBus    : null,
    allias      : '',

    methods : {
        type: Array
    },

    requestWebMethodsMetaData : function requestWebMethodsMetaData(){
        var
            request = new XMLHttpRequest(),
            tokens = this.nameSpace.split("."),
            formData = new FormData(),
            data
        ;

        this.url = url = this.domain + tokens.join("/");
        request.open( 'METADATA', this.url, false);
        request.setRequestHeader('content-type','application/json');
        request.send(formData);

        if(request.status != 200) throw new Error('Error loading ' + this.nameSpace + ' wb methods meta data. ' + request.statusText + '.');

        data = JSON.parse(request.responseText);
        this.webMethodsMetaData = data;
    },

    build: function build(){
        this.requestWebMethodsMetaData();

        var
            methods = this.webMethodsMetaData.methods, 
            methodMetaData, index
        ;

        for(index in methods){
            this.buildMethod(methods[index]);
        }
        return this.methods;
    },

    buildMethod: function buildMethod(methodMetaData){
        var name = methodMetaData.name, method;
        
        methodMetaData = {
            domain          : this.domain,
            nameSpace       : this.nameSpace + '.' + name,
            name            : name,
            url             : this.url,
            eventBus        : this.eventBus,
            parentAllias    : this.allias
        };

        method = new WebMethod( methodMetaData );
        this.methods.push(method);
    }
};


