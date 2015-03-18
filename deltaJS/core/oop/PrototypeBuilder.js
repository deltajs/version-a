

function PrototypeBuilder( properties ){
    this.properties     = properties;
    this.newPrototype   = {};
}

PrototypeBuilder.prototype = {
    properties      : null,
    newPrototype    : null,

    build : function build(){
        var
            properties = this.properties,
            propertyInfo, propertyName,
            newPrototype = this.newPrototype
        ;

        for(propertyName in properties){
            propertyInfo = properties[propertyName];
            Object.defineProperty(newPrototype, propertyName, propertyInfo);
        }

        return this.newPrototype;
    }
}
