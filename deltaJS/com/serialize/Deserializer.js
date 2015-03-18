
Deserializer.super = "delta.com.ObjectBase";

function Deserializer(params){
    Super(this, params);
    this.propertiesToSerialize = this.instance.constructor.metaData.propertiesToSerialize;
    this.properties = this.instance.constructor.properties;
}

Deserializer.properties = {
    instance                : null,
    propertiesToSerialize   : null,
    data                    : null,

    deserialize : function deserialize(){
        var
            propertiesToSerialize = this.propertiesToSerialize,
            index, propertieName
        ;

        for(index in propertiesToSerialize){
            propertieName = propertiesToSerialize[index];
            this.deserializeProperty(propertieName);
        }
    },

    deserializeProperty : function deserializeProperty(propertieName){
        var
            propertyInfo = this.properties[propertieName],
            data = this.data, instance = this.instance
        ;
        
        if(!data.hasOwnProperty(propertieName)){
            return;
        }
        
        if(propertyInfo.type && instance[propertieName] && instance[propertieName].deserializeFrom){
            instance[propertieName].deserializeFrom(data[propertieName]);
        }else{
            instance[propertieName] = data[propertieName];
        }
    }
};

