
PropertyNotifier.Super = "delta.com.objectBase.ObjectBase";

function PropertyNotifier(params){
    Super(this, params);
    this.bindAccessors();
}

PropertyNotifier.properties = {
    notifier        : null,
    rootObject      : null,
    sourceObject    : null,

    originalSetter  : null,
    originalGetter  : null,

    bindAccessors : function bindAccessors(){
        this.set = this.set.bind( this );
        this.get = this.get.bind( this );
    },

    notifyUpdate : function notifyUpdate(){
        this.notifier.notify({
            type            : 'field-update',
            rootObject      : this.rootObject,
            sourceObject    : this.sourceObject,
            propertyName    : this.propertyName
        });
    },

    set : function fieldSetter(value){
        originalSetter.call()

        this.notifyUpdate();
    },

    get : function fieldGetter(){
        return this.fieldValue;
    }
}

