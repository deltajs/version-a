
Catalog.super = "delta.com.ObjectBase";

function Catalog(params){
    Super(this, params);
}

Catalog.properties = {
    addItem : function addItem(item, idKey){
        this[item[idKey]] = item;
    },

    addArray : function addArray(array, idKey){
        var
            index = 0,
            length = array.length,
            item
        ;
        for(;index<length;index++){
            item = array[index];
            this[item[idKey]] = item;
        }
    }
};




