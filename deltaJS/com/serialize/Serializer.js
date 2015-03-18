

Serializer.super = "delta.com.ObjectBase";

function Serializer(params){
    Super(this, params);

    this.classs = this.instance.constructor;
    this.propertiesToSerialize = this.classs.metaData.propertiesToSerialize;
    this.propertiesInfo = this.classs.properties;
    this.buildPropertiesToSkip(this.propertiesToSkip);
}

Serializer.properties = {
    classs              : null,
    instance            : null,
    propertiesToSkip    : null,
    propertiesInfo      : null,

    data : {
        type : Object
    },

    buildPropertiesToSkip : function buildPropertiesToSkip(properties){
        if(!this.propertiesToSkip){
            this.propertiesToSkip = [];
        }
        if(Array.isArray(this.propertiesToSkip)){
            return;
        }
        this.propertiesToSkip = Object.toArray(properties);
    },

    buildParentNameSpace : function buildParentNameSpace(){
        var
            data = this.data,
            nameSpace = this.classs.nameSpace.split('.')
        ;
        nameSpace.pop();
        data._parentNameSpace_ = nameSpace.join('.');
    },

    isPropertytoSkip : function isPropertytoSkip(propertieName){
        if(this.propertiesToSkip.indexOf(propertieName) != -1 ){
            return true;
        }
        return false;
    },

    getPropertyInfo : function getPropertyInfo(propertieName){
        return this.propertiesInfo[propertieName];
    },

    serialize : function serialize(){
        var
            instance = this.instance,
            propertiesToSerialize = this.propertiesToSerialize,
            data = this.data, index
        ;

        for(index in propertiesToSerialize){
            propertieName = propertiesToSerialize[index];
            this.serializeProperty(propertieName);
        }

        data._nameSpace_ = this.classs.nameSpace;
        this.buildParentNameSpace();
        return data;
    },

    serializeProperty : function serializeProperty(propertieName){
        if(this.isPropertytoSkip(propertieName)){
            return;
        }

        var
            propertyInfo = this.getPropertyInfo(propertieName),
            data = this.data, instance = this.instance
        ;

        if(propertyInfo.type) {
            data[propertieName] = instance[propertieName].serialize();
        } else {
            data[propertieName] = instance[propertieName];
        }
    }
};


