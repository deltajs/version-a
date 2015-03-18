
var
    FieldNotifier = include( parentNameSpace + ".FieldNotifier" )
;

ObjectObserverNode.Super = "delta.com.dataStructure.graph.GraphNode";

function ObjectObserverNode(params){//object, propertyName, pathObservedBuilder){
    Super(this, params);
}

ObjectObserverNode.prototype = {
    notifier : null,

    bind : function bind(object){
        console.log(object, this.id);

        var
            propertyDescriptor = Object.getOwnPropertyDescriptor( object, this.id ),
            propertyType = this.getPropertyType(propertyDescriptor)
        ;

        switch( propertyType ){
            case "field":
                this.notifier = new FieldNotifier();
                break;
            case "property":
                break;
        }

        Object.defineProperty(object, this.id, this.notifier);
    },

    getPropertyType : function getPropertyType( propertyDescriptor ){
        if(propertyDescriptor.value) return "field";
        return "property";
    }
}

var proxyAccessors = {
    fieldSetter : function fieldSetter(value){
        this.fieldValue = value;
        console.log("tara");
    },

    fieldGetter : function fieldGetter(){
        return this.fieldValue;
    },

    //propertySetter 
}




