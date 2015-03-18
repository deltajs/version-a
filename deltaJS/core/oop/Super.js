
Super.map = new Map();

function Super(instance, parameters){
    this.instance               = instance
    this.parameters             = parameters;
    this.classs                 = instance.constructor;
    this.ancestry               = this.classs.metaData.ancestry;

    Super.map.set(instance, this);
}

Super.prototype = {
    invokedConstructors : null,

    cleanParameters : function cleanParameters(){
        this.parameters = Object.toArray(this.parameters);
        this.parameters.shift();
    },

    invokeConstructors : function invokeConstructors(){
        var
            index,
            ancestry = this.ancestry,
            superClass
        ;

        for(index in ancestry){
            superClass = ancestry[index];
            superClass.apply(this.instance, this.parameters);
        }
    },

    invoke : function invoke(){
        this.cleanParameters();
        this.invokeConstructors();
    }
}



