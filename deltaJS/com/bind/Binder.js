
var
    ObjectObserver = include("delta.com.bind.ObjectObserver")
;

Binder.Super = "delta.com.objectBase.ObjectBase";

function Binder(params){
    Super(this, params);
    
}

Binder.bind = function(object, path, propertyName, updaterName){
    var objectObserver = ObjectObserver.build( object );
    objectObserver.observePath( path );
}


Binder.updaters = {};
Binder.registerUpdater = function registerUpdateTransaction(name, callBack){
    Binder.updaters[name] = callBack;
}

