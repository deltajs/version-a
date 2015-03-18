
WebMethod.super = [
    'delta.com.ObjectBase',
    'delta.com.event.EventBusDispatcher'
];

function WebMethod(params){
    Super(this, params);
    
    this.decodeNameSpace();
    this.buildEventNames();

    if(this.eventBus == null && params["@parentObject"]){
        this.eventBus = params["@parentObject"].eventBus;
    }
}

WebMethod.properties = {
    domain                  : '/wsgi/ws/',
    nameSpace               : null,
    name                    : null,
    parentAllias            : '',
    url                     : null,

    handleFiles             : false,
    protocol                : 'POST',
    
    user                                : null,
    password                            : null,
    redirectOnAuthenticationException   : true,

    async                   : true,
    scope                   : null,
    allowMultipleRequests   : false,

    requests :{
        type : Array
    },

    recycledRequests : {
        type : Array
    },

    headers : {
        type:Object
    },

    get working(){
        if(this.requests.length > 0)return true;
        return false;
    },

    buildEventNames : function buildEventNames(){
        var
            name = this.name.capitalize(),
            parentAllias = this.parentAllias.capitalize()
        ;

        this.eventsName = {
            success : 'on' + parentAllias + name + 'Success',
            fail    : 'on' + parentAllias + name + 'Fail',
        }
    },

    recycleRequest : function recycleRequest(request){
        this.requests.remove(request);
        this.recycledRequests.push(request);
    },

    buildRequest : function createRequest(){
        var request = this.recycledRequests.pop()
        if(request){
            delete request.callBacks;
            return request;
        }        

        request = new XMLHttpRequest();
        request.ParentObject = this;
        request.addEventListener("load"       , this.success   , false);
        request.addEventListener("error"      , this.error     , false);

        this.requests.push(request);
        return request;
    },

    decodeNameSpace : function decodeNameSpace(){
        if(this.url != null) return;
        var
            tokens = this.nameSpace.split("."),
            tail = tokens.pop()
        ;
        this.name = tail;
        this.url = this.domain + tokens.join("/");
    },

    success : function success(event){
        var
            me = this.ParentObject,
            request = this,
            type = request.getResponseHeader('content-type')
        ;
        event.dispatcher = me;
        me.recycleRequest(this);
        try{
            switch(type){
                case 'application/number'   : event.result = parseFloat(request.responseText); break;
                case 'application/string'   : event.result = request.responseText; break;
                case 'application/json'     : event.result = JSON.parse( request.responseText ); break;
                case 'application/null'     : event.result = null; break;
                case 'application/bool'     : event.result = request.responseText == "true" ? true : false; break;
                default                     : event.result = request.responseText; break;
            }
        }catch(err){
            event.result = { message:'Parse error on client decoding <' + type + '>. ' + err };
            me.dispatchEvent(me.eventsName.fail, event);
            me.excecuteCallBack(request, "onFail", event);
            return;
        }
        
        if(request.status != 200){
            me.detectAuthenticationException(event);

            me.dispatchEvent(me.eventsName.fail, event);
            me.excecuteCallBack(request, "onFail", event);
        }
        else{
            me.dispatchEvent(me.eventsName.success, event);
            me.excecuteCallBack(request, "onSuccess", event);
        }
    },

    detectAuthenticationException : function detectAuthenticationException( event ){
        if(!this.redirectOnAuthenticationException) return;
        var
            exception = event.result
        ;
        if(exception.type == "LoginRequired"){
            window.location.href = exception.redirectTo;
        }
    },

    error : function error(event) {
        var
            me = this.ParentObject
        ;

        event.dispatcher = me;
        me.recycleRequest(this);
        me.dispatchEvent(this.eventsName.fail, event);
        me.excecuteCallBack(request, "onFail");
    },

    excecuteCallBack : function excecuteCallBack(request, callBackName, event){
        var callBacks = request.callBacks;
        if(!callBacks || !callBacks[callBackName] )return;
        callBacks[callBackName](event);
    },

    prepareForFiles : function prepareForFiles(data, formData){
        var
            filesKeys = []
        ;

        delta.core.objecme.walk( data, function(child, parent, root, property, path){
            if(child instanceof Blob || child instanceof File ){
                filesKeys.push(path);
                parent[property] = null;
                formData.append('file:' + path, child, child.name);
                return false;
            }
            return true;
        });
        formData.append('filesKeys', JSON.stringify(filesKeys));
    },

    call : function call(data, callBacks){
        data = data || {};

        var
            me      = this,
            headers = me.headers,
            user    = me.user,
            formData,
            request
            name
        ;

        if( me.working && !me.allowMultipleRequests){
            return;
        }

        request = this.buildRequest();

        if(callBacks){
            request.callBacks = callBacks;
        }

        request.open(
            me.protocol,
            me.url, me.async,
            user, me.password
        );

        if(user) request.withCredentials = true;

        for(name in headers ) request.setRequestHeader(name, headers[name]);
        request.setRequestHeader("Accept", "application/json")

        formData = new FormData();

        if(this.handleFiles){
            this.prepareForFiles( data, formData);
        }

        formData.append( 'method' , me.name);
        formData.append( 'data' , JSON.stringify(data));
        request.send( formData );
    }
};



























