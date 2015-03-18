
var
    WebMethodsBuilder = include('delta.com.network.WebMethodsBuilder')
;

WebService.super = 'delta.com.ObjectBase';

function WebService(params){
    Super(this);

    var
        webMethodsBuilder = new WebMethodsBuilder(params),
        methods = webMethodsBuilder.build(), index
    ;
    this.webMethodsBuilder = webMethodsBuilder;
    for(index in methods){
        method = methods[index];
        this[ method.name ] = method.call.bind(method);
    }
}

WebService.properties = {
    webMethodsBuilder   : null,
    set eventBus(eventBus){
        for(index in methods){
            method = methods[index];
            method.eventBus = eventBus
        }
    }
};


























