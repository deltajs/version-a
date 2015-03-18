

function PropertiesDescriptionBuilder( classs ){
    this.classs             = classs;
    this.propertiesToIgnore = ["constructor"];
}

PropertiesDescriptionBuilder.prototype = {
    classs              : null,
    propertiesToIgnore  : null,
    checkForObject      : false,

    build : function build(){
        this.buildPropertiesObject();
        var
            classProperties = this.classs.properties,
            classPrototype = this.classs.prototype
        ;
        
        this.processProperties(classPrototype);

        if(classProperties){
            this.checkForObject = true;
            this.processProperties(classProperties);
        }

        return this.properties;
    },

    buildPropertiesObject : function buildPropertiesObject(){
        this.properties = {
            constructor : {
                value       : this.classs,
                enumerable  : false,
            }
        };
    },

    processProperties : function processProperties(properties){
        var
            propertiesName = Object.getOwnPropertyNames(properties),
            propertyName, index = 0, length = propertiesName.length
        ;

        for(;index<length;index++){
            propertyName = propertiesName[index];

            if( this.propertiesToIgnore.indexOf(propertyName) != -1){
                continue;
            }

            this.buildProperty(propertyName, properties);
        }
    },

    buildProperty : function buildProperty(propertyName, properties){
        var
            propertyInfo = Object.getOwnPropertyDescriptor(properties, propertyName)
        ;

        propertyInfo = this.processPropertyInfo(propertyInfo);

        Object.defineProperty(this.properties, propertyName, {
            enumerable  : true,
            value       : propertyInfo
        });
    },

    processPropertyInfo : function processPropertyInfo(propertyInfo){
        propertyInfo.enumerable = false;

        if(this.checkForObject && propertyInfo.value && propertyInfo.value.constructor == Object){
            propertyInfo = propertyInfo.value;
        }

        if(propertyInfo.writable == null){
            propertyInfo.writable = true;
        }
        
        if(propertyInfo.enumerable == null){
            propertyInfo.enumerable = false;
        }

        if(propertyInfo.configurable == null){
            propertyInfo.configurable = true;
        }

        if(propertyInfo.get || propertyInfo.set){
            delete propertyInfo.writable;
        }
        
        /*if(propertyInfo.get == null && propertyInfo.set == null && propertyInfo.value === undefined){
            propertyInfo.value = null;
        }*/

        if(propertyInfo.get && propertyInfo.set == null){
            propertyInfo.editable = false;
        }

        return propertyInfo;
    }
}