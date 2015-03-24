
ArrayToElementAdapter.Super = "delta.com.bind.arrayObserver.ArrayObserver";

function ArrayToElementAdapter(params){
    Super(this, params);

}

ArrayToElementAdapter.prototype = {
    element         : null,
    htmlTemplate    : null,

    buildTemplate : function buildTemplate(){
        return this.htmlTemplate.toHtml();
    },

    onItemAdded : function onItemAdded(index, addedCount, change){
        //console.log("onItemAdded", index, "count:", addedCount);
        console.log( change, change.object.length );

        return;
        var
            length = this.element.children.length,
            data, arrayLength
        ;

        console.log(index, length, addedCount);

        if(length == index){
            data = this.array[index];
            this.addChild( data );
        }else if(length > index){
            this.addChilds(index, addedCount);
        }else{

        }
    },

    addChilds : function addChilds(index, addedCount){
        var arrayLength = index + addedCount, data;
        for(; index < arrayLength; index++){
            data = this.array[index];
            this.addChild( data );
        }
    },

    addChild : function addChild(data){
        var
            child = this.buildTemplate(data)
        ;
        this.element.appendView( child );
    },


    onItemRemoved : function onItemRemoved(index, removedCount, removedItems, change){
        console.log("onItemRemoved", index, removedCount, removedItems);
        this.element.appendView( child );
    },

    onItemUpdated : function onItemUpdated(index, oldValue, change){
        console.log("onItemUpdated", index, oldValue);
    },

    onPropertyAdded : function onPropertyAdded(name, change){
        console.log("onPropertyAdded", name);
    },

    onPropertyRemoved : function onPropertyRemoved(name, change){
        console.log("onPropertyRemoved", name);
    }
}

