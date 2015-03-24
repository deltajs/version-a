
ArrayObserver.Super = "delta.com.objectBase.ObjectBase";

function ArrayObserver( params ){
    Super(this, params);
    this.observerMethod = this.observerMethod.bind(this);
}

ArrayObserver.properties = {
    array : null,

    observerMethod : function observerMethod( changes ){
        var
            index = 0, length = changes.length, change
        ;
        for (;index<length;index++) {
            change = changes[index];
            this.processChange( change );
        };
    },

    start : function start() {
        Array.observe( this.array, this.observerMethod );
    },

    processChange : function processChange(change){
        switch(change.type){
            case "splice" : this.processSpliceChange( change ) ; break;
            case "update" : this.processUpdateChange( change ) ; break;
            case "add" : this.processAddChange( change ) ; break;
            case "delete" : this.onPropertyRemoved( change.name, change ) ; break;
            default : throw "Unsuported change type: " + change.type ;
        }
    },

    processAddChange : function processAddChange(change){
        var
            name        = change.name,
            index       = parseInt( name ),
            oldValue    = change.oldValue,
            addedCount
        ;

        if( isNaN(index) ){
            this.onPropertyAdded(name, change);  
        } else {
            if(index - this.array.length + 1 < 0){
                this.onItemUpdated(index, undefined, change);
            }else{
                throw "Length error for artifitial array instance of " + change.object.constructor.name;
            }
        }
    },

    processUpdateChange : function processUpdateChange(change){
        var
            index = parseInt( change.name ),
            oldValue = change.oldValue
        ;
        if( isNaN(index) ) return;
        this.onItemUpdated(index, oldValue, change);
    },

    processSpliceChange : function processSpliceChange(change){
        var
            index           = change.index,
            removedItems    = change.removed,
            removedCount    = removedItems.length,
            addedCount      = change.addedCount
        ;

        if(removedCount > 0) {
            this.onItemRemoved(index, removedCount, removedItems, change);
        }

        if(addedCount > 0){
            this.onItemAdded(index, addedCount, change);
        }
    },

    onItemAdded : function onItemAdded(index, addedCount, change){
        //console.log("onItemAdded", index, "count:", addedCount);
    },

    onItemRemoved : function onItemRemoved(index, removedCount, removedItems, change){
        //console.log("onItemRemoved", index, removedCount, removedItems);
    },

    onItemUpdated : function onItemUpdated(index, oldValue, change){
        //console.log("onItemUpdated", index, oldValue);
    },

    onPropertyAdded : function onPropertyAdded(name, change){
        //console.log("onPropertyAdded", name);
    },

    onPropertyRemoved : function onPropertyRemoved(name, change){
        //console.log("onPropertyRemoved", name);
    }
};

