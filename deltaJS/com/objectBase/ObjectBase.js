
var
    PropertiesToInitializeBuilder = include( parentNameSpace + ".subordinates.PropertiesToInitializeBuilder" ),
    PropertiesToExtractBuilder = include( parentNameSpace + ".subordinates.PropertiesToExtractBuilder" ),
    PropertiesInitializer = include( parentNameSpace + ".subordinates.PropertiesInitializer"),
    PropertiesExtractor = include( parentNameSpace + ".subordinates.PropertiesExtractor")
;

function ObjectBase(params){
    this.initializeProperties();
    this.extractPropertiesFromParams(params);
}

ObjectBase.properties = {

    initializeProperties : function initializeProperties(){
        var propertiesInitializer = new PropertiesInitializer(this);
        propertiesInitializer.initialize();
    },

    extractPropertiesFromParams : function extractPropertiesFromParams(params){
        if(params == null) return;

        var propertiesExtractor = new PropertiesExtractor(this, params);
        propertiesExtractor.extract();
    }
};

ObjectBase.processSubClass = function(classs){
    var
        propertiesToInitializeBuilder = new PropertiesToInitializeBuilder(classs),
        propertiesToExtractBuilder = new PropertiesToExtractBuilder(classs),

        propertiesToInitialize = propertiesToInitializeBuilder.build(),
        propertiesToExtract = propertiesToExtractBuilder.build()
    ;

    classs.Super.data.set(PropertiesInitializer, propertiesToInitialize);
    classs.Super.data.set(PropertiesExtractor , propertiesToExtract);
}



