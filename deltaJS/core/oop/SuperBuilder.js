
var
    Zuper = include("delta.core.oop.Super")
;

function SuperBuilder(classs){
    this.classs = classs;
}

SuperBuilder.prototype = {
    classs : null,

    buildSuper : function build(){
        this.zuper = function Super(instance){
            if( Zuper.map.get( instance ) ) return;
            var zuper = new Zuper(instance, arguments);
            zuper.invoke();
        };
        this.zuper.data = new Map();
    },

    attachMethodsReferences : function attachMethodsReferences(){
        var
            classs          = this.classs,
            parentClasses   = classs.metaData.parentClasses,
            methods         = this.buildMethods(),
            superClass, index
        ;

        classs.metaData.methods = methods;

        for(index in parentClasses){
            superClass = parentClasses[index];
            if(superClass.metaData == null){
                continue;
            }
            this.zuper[superClass.name] = Object.keyClone( superClass.metaData.methods );
        }
    },

    buildMethods : function buildMethods(){
        var 
            propertyName,
            propertyInfo,
            classs          = this.classs,
            properties      = classs.properties,
            methods         = {}
        ;

        for(propertyName in classs.properties){
            propertyInfo = properties[propertyName];
            if(propertyInfo.value == null || typeof propertyInfo.value != "function"){
                continue;
            }
            methods[propertyName] = propertyInfo.value;
        }
        return methods;
    },

    build : function build(){
        this.buildSuper();
        this.attachMethodsReferences();
        return this.zuper;
    }
}
