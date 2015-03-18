

function PropertiesExtractor(instance, params){
    this.instance   = instance;
    this.classs     = instance.constructor;
    this.zuper      = this.classs.Super;
    this.params     = params

    this.propertiesToExtract = this.zuper.data.get(PropertiesExtractor);

    if(!this.propertiesToExtract){
        throw "Class " + this.classs.name + " must inherit from delta.com.objectBase.ObjectBase," +
        " to allow instances to use PropertiesExtractor to extract properties";
    }
}

PropertiesExtractor.properties = {
    instance                : null,
    classs                  : null,
    propertiesToExtract     : null,
    zuper                   : null,
    params                  : null,

    extractProperty : function extractProperty( propertyName ){
        var
            instance        = this.instance
        ;

        if(propertyName in this.params){
            instance[ propertyName ] = this.params[propertyName];
        }
    },

    extract : function extract(){
        var
            propertiesToExtract = this.propertiesToExtract,
            length = propertiesToExtract.length,
            index = 0, propertyName
        ;

        for(;index<length;index++){
            propertyName = propertiesToExtract[ index ];
            this.extractProperty(propertyName)
        }
    },
}
