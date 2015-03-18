
function PropertiesToExtractBuilder(classs){
    this.classs     = classs;
    this.properties = classs.properties;
    this.propertiesToExtract = [];
}

PropertiesToExtractBuilder.properties = {
    propertiesToExtract : null,

    evaluatePropertyInfo : function evaluatePropertyInfo(propertyName, propertyInfo ){
        if(propertyInfo.extractable === false)          return;
        if(propertyInfo.writable === false)             return;
        if(typeof propertyInfo.value === "function")    return;

        this.propertiesToExtract.push(propertyName);
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

        return this.propertiesToExtract;
    }
}


