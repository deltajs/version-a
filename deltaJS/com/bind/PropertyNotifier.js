
PropertyNotifier.Super = parentNameSpace + ".FieldNotifier";

function PropertyNotifier(params){
    Super(this, params);

    this.bindAccessors();
}

PropertyNotifier.properties = {
    originalSetter      : null,
    originalGetter      : null,

    set : function propertySetter(value){
        this.originalSetter.call( this.sourceObject, value );
        this.react();
    },

    get : function propertyGetter(){
        return this.originalGetter.call( this.sourceObject );
    }
}
