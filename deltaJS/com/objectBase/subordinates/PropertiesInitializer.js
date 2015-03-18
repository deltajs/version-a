

function PropertiesInitializer(instance){
    this.instance   = instance;
    this.classs     = instance.constructor;
    this.zuper      = this.classs.Super;

    this.propertiesToInitialize = this.zuper.data.get(PropertiesInitializer);

    if(!this.propertiesToInitialize){
        throw "Class " + this.classs.name + " must inherit from delta.com.objectBase.ObjectBase," +
        " to allow instances to use PropertiesInitializer to initialize properties";
    }
}

PropertiesInitializer.properties = {
    instance                : null,
    classs                  : null,
    propertiesToInitialize  : null,
    zuper                   : null,

    initializeProperty : function initializeProperty( propertyName ){
        var
            classs          = this.classs, 
            instance        = this.instance,

            propertyInfo    = Object.keyClone( classs.properties[ propertyName ] ),
            
            type            = propertyInfo.type,
            params          = propertyInfo.params,
            
            value
        ;

        if(params && params.constructor == Object){
            params = Object.keyClone( params );
            params["@parentObject"] = instance;
            propertyInfo.value = new type(params);

        } else if( params && type.dinamicConstructor && Array.isArray(params) ){
            propertyInfo.value = type.dinamicConstructor.apply(null, propertyInfo.params);
        } else {
            propertyInfo.value = new type();
        }

        Object.defineProperty( instance, propertyName, propertyInfo);
    },

    initialize : function initialize(){
        var
            propertiesToInitialize = this.propertiesToInitialize,
            length = propertiesToInitialize.length,
            index = 0, propertyName
        ;

        //console.log(this.classs.name, propertiesToInitialize);

        for(;index<length;index++){
            propertyName = propertiesToInitialize[ index ];
            this.initializeProperty(propertyName)
        }
    },
}
