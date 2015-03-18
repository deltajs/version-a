

function InheritanceBuilder(allClasses){
    this.classs = allClasses[0];
    this.allClasses = allClasses;
}

InheritanceBuilder.prototype = {
    propertiesOrder         : null,
    properties              : null,
    propertiesDescriptions  : null,

    buildClassesPropertiesDescriptions : function buildClassesPropertiesDescriptions(){
        var
            allClasses = this.allClasses,
            length = allClasses.length,
            classs, propertiesDescriptions = []
        ;

        while(length--){
            classs = allClasses[length];
            propertiesDescriptions.push(classs.properties);
        }

        this.propertiesDescriptions = propertiesDescriptions;
    },

    buildPropertiesOrder : function buildPropertiesOrder() {
        var
            allClasses = this.allClasses,
            length = allClasses.length,
            propertiesGroup,
            propertiesDescriptions = this.propertiesDescriptions
        ;

        this.propertiesOrder = [];

        while(length--){
            propertiesGroup = propertiesDescriptions[length];
            this.addPropertiesToOrder( propertiesGroup );
        }
    },

    addPropertiesToOrder : function addPropertiesToOrder( propertiesGroup ){
        var
            property
        ;

        for(property in propertiesGroup){
            if( this.propertiesOrder.indexOf(property) != -1 ){
                continue;
            }

            this.propertiesOrder.push( property );
        }
    },

    buildProperties : function buildProperties( ){
        var
            propertiesDescriptions = this.propertiesDescriptions,
            length = propertiesDescriptions.length, index = 0,
            propertiesGroup
        ;

        propertiesDescriptions.reverse();
        this.properties = {};

        for(;index<length;index++){
            propertiesGroup = propertiesDescriptions[index];
            this.copyProperties( propertiesGroup );
        }

        this.properties.constructor = this.classs.properties.constructor;
    },

    copyProperties : function copyProperties(propertiesGroup){
        var
            properties = this.properties,
            propertiesOrder = this.propertiesOrder,
            length = propertiesOrder.length, index = 0,
            propertyName, propertyDescription
        ;

        for(;index<length;index++){
            propertyName = propertiesOrder[index];
            
            if(properties.hasOwnProperty(propertyName) || !propertiesGroup.hasOwnProperty(propertyName) ){
                continue;
            }

            propertyDescription = propertiesGroup[propertyName];
            properties[propertyName] = propertyDescription;
        }
    },

    build : function(){
        this.buildClassesPropertiesDescriptions();
        this.buildPropertiesOrder();
        this.buildProperties();

        //console.log(this.classs.name, Object.keys( this.properties), this.properties );
        return this.properties;
    }
};
