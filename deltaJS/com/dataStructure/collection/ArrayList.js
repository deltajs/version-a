
ArrayList.super = "delta.com.dataStructure.collection.ArrayBase";

function ArrayList(params){
    Super(this, params);
}

ArrayList.properties = {
    defaultItemType : null,
    
    push : function push(item, extraData){
        var propertyName;
        if(item.constructor == Object && this.defaultItemType){
            if(extraData){
                for(propertyName in extraData){
                    item[propertyName] = extraData[propertyName];
                }
            }
            item = new this.defaultItemType(item);
        }
        Super.ArrayBase.push.call(this, item);
        return item;
    },

    setItems : function push(items, extraData){
        var
            index = 0,
            length = items.length
        ;
        for(;index<length;index++){
            this.push(items[index], extraData);
        }
    }
};

