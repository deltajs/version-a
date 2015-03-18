

var
	Updater = include( parentNameSpace + ".updater.Updater" )
;

Relationship.Super = "delta.com.objectBase.ObjectBase";

function Relationship(params){
	Super(this, params);
    this.buildUpdater();
}

Relationship.properties = {
    targetObject    : null,
    propertyName    : null,
    updaterName     : null,
    updaterClass 	: null,
    updater 		: null,

    buildUpdater : function buildUpdater(){
    	var
    		updaterClass = Updater.getByName(this.updaterName)
    	;
    	this.updater = new updaterClass();
    }
};


Relationship.objectRelationships = new Map();
Relationship.getObjectRelationships = function getObjectRelationships(object){
    var objectRelationships = Relationship.objectRelationships.get(object);
    if(objectRelationships) return objectRelationships;
    
    objectRelationships = {};
    Relationship.objectRelationships.set( object, objectRelationships );
    return objectRelationships;
}

Relationship.getPropertyRelationships = function getPropertyRelationships(object, path){
    var objectRelationships = Relationship.getObjectRelationships(object);
    if(!(path in objectRelationships)) objectRelationships[path] = [];
    return objectRelationships[path];
}