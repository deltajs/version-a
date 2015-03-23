
var
    FieldNotifier       = include( parentNameSpace , "..notifier.FieldNotifier" ),
    PropertyNotifier    = include( parentNameSpace , "..notifier.PropertyNotifier" ),
    Relationship        = include( parentNameSpace , "..Relationship" )
;

ObjectObserverNode.Super = "delta.com.dataStructure.graph.GraphNode";

function ObjectObserverNode(params){
    Super(this, params);
    this.buildProperties();

    //console.log(this.path);
}

ObjectObserverNode.properties = {
    notifier        : null,
    propertyName    : null,
    sourceObject    : null,
    rootObject      : null,

    buildProperties : function buildProperties(){
        this.path                   = this.id;
        this.propertyName           = this.path.split(".").pop();
        this.rootObject             = this.graph.rootObject;
        this.propertyRelationships  = Relationship.getPropertyRelationships( this.rootObject, this.path );
    },

    bind : function bind(sourceObject, mustNotify, notifier){
        this.sourceObject = sourceObject;

        var
            propertyDescriptor      = Object.getOwnPropertyDescriptor( sourceObject, this.propertyName ),
            propertyType            = this.getPropertyType(propertyDescriptor),
            
            data = {
                sourceObject            : sourceObject,
                propertyName            : this.propertyName,
                propertyDescriptor      : propertyDescriptor,
                fieldValue              : propertyDescriptor.value,
                originalGetter          : propertyDescriptor.get,
                originalSetter          : propertyDescriptor.set,
                mustNotify              : mustNotify,
                node                    : this,
                notifier                : notifier,
                rootObject              : this.rootObject,
                path                    : this.path,
                propertyRelationships   : this.propertyRelationships
            }
        ;

        switch( propertyType ){
            case "field":
                this.notifier = new FieldNotifier(data);
                break;
            case "property":
                this.notifier = new PropertyNotifier(data);
                break;
        }

        Object.defineProperty(sourceObject, this.propertyName, this.notifier);
    },

    rebindPathToLeafs : function rebindPathToLeafs(){
        this.graph.rebindPathToLeafsFromNode(this);
    },

    getPropertyType : function getPropertyType( propertyDescriptor ){
        if(!propertyDescriptor){
            console.log("Source object:", this.sourceObject);
            throw "Property " + this.propertyName + " is missing in source object at " + this.id;
        }

        if('get' in propertyDescriptor) return "property";
        if('set' in propertyDescriptor) return "property";
        return "field";
    }
}





