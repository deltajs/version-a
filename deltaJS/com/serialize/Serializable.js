
var
    Serializer = include("delta.com.serialize.Serializer"),
    Deserializer = include("delta.com.serialize.Deserializer")
;

Serializable.super = "delta.com.ObjectBase";

function Serializable(params){
    Super(this, params);
    
}

Serializable.properties = {
    serialize : function(options){
        options = options || {};
        options.instance = this;
        serializer = new Serializer(options);
        return serializer.serialize();
    },

    deserializeFrom : function deserializeFrom( data ){
        var
            options = {
                data : data,
                instance : this
            },
            deserializer = new Deserializer(options)
        ;
        deserializer.deserialize();
    }
};



