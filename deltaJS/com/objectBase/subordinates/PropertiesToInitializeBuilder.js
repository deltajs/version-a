

function PropertiesToInitializeBuilder(classs){
    this.classs     = classs;
    this.properties = classs.properties;
    this.propertiesToInitialize = [];
}

PropertiesToInitializeBuilder.properties = {
    propertiesToInitialize : null,

    evaluatePropertyInfo : function evaluatePropertyInfo(propertyName, propertyInfo ){
        if( propertyInfo.type == null)  return;
        if(propertyInfo.get)            return;
        if(propertyInfo.set)            return;
        if('value' in propertyInfo)     return;

        this.propertiesToInitialize.push(propertyName);
    },

    build : function build( ){
        var 
            propertyName, propertyInfo,
            properties = this.properties
        ;

        for(propertyName in properties){
            propertyInfo = properties[propertyName];
            this.evaluatePropertyInfo(propertyName, propertyInfo);
        }

        return this.propertiesToInitialize;
    }
}


