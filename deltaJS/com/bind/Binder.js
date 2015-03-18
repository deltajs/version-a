
var
    ObjectObserver  = include("delta.com.bind.ObjectObserver"),
    Relationship    = include( parentNameSpace + ".Relationship" ),
    Updater         = include( parentNameSpace + ".updater.Updater" )
;

function Binder(){}

Binder.bind = function(object, path, targetObject, propertyName, updaterName){
    var
        objectObserver = ObjectObserver.build( object ),
        lastNode = objectObserver.observePath( path ),

        propertyRelationships = lastNode.propertyRelationships,
        relationship = new Relationship({
            targetObject    : targetObject,
            propertyName    : propertyName,
            updaterName     : updaterName
        })
    ;

    propertyRelationships.push(relationship);
}

Updater.register("delta.com.bind.updater.FieldUpdater");


