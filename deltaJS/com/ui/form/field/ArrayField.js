
ArrayField.super = "delta.com.ui.form.field.FieldBase";

function ArrayField(params){
    Super(this, params);
    this.modifyModel();
    this.buildView();
}

ArrayField.properties = {
    itemDefaultType : null,
    items : {
        enumerable : false,
        type : Array
    },

    modifyModel : function modifyModel(){
        this.form.model[this.name] = [];
    },

    addNewItem : function addNewItem(data){
        var
            type = this.itemDefaultType,
            item = new type({
                parent : this,
                viewNameSpace : 'delta.com.ui.form.field.ArrayFieldItem'
            })
        ;

        if( data ){
            item.deserializeFrom( data );
        }

        this.items.push(item);
        this.form.model[this.name].push(item.model);
        this.referenceToElements.items.appendView(item);
    },

    set value(items){
        if(!items) return;
        var
            index = 0, length = items.length
        ;

        for(; index<length; index++){
            this.addNewItem( items[index] );
        }
    },

    createNewItem : function createNewItem(  ){
        this.addNewItem();
    },

    updateModel : function updateModel(){
    },

    remove : function remove( event ){
        var item = event.rootDispatcher;

        console.log(item);

        this.items.remove(item);
        this.form.model[this.name].remove(item.model);
        console.log(this.referenceToElements.items)
        this.referenceToElements.items.removeView(item);
    }
};


