
ArrayBase.Super = [
    Array,
    "delta.com.objectBase.ObjectBase"
];

function ArrayBase(params){
    Super(this, params);
    Array.call(this);
}

ArrayBase.properties = {
    deserializeFrom : function(data){
        if(data == null)return;
        var
            index = 0, length = data.length
        ;

        this.clear();
        
        for(;index<length;index++){
            this.push(data[index]);
        }
    }
};

Array._isArray_ = Array.isArray;
Array.isArray = function(instance){
    if(instance == null){
        return false
    }
    if(Array._isArray_(instance)){
        return true;
    }
    if(typeof instance == "object" && instance.constructor && instance.constructor.metaData){
        if(instance.constructor.metaData.ancestry.indexOf(ArrayBase) != -1){
            return true;
        }
    }
    return false;
};

