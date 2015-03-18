
FieldNotifier.Super = "delta.com.objectBase.ObjectBase";

function FieldNotifier(params){
    Super(this, params);
    this.bindAccessors();
}

FieldNotifier.properties = {
    fieldValue      : undefined,
    notifier        : null,
    rootObject      : null,
    sourceObject    : null,

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
        this.fieldValue = value;
        this.notifyUpdate();
    },

    get : function fieldGetter(){
        return this.fieldValue;
    }
}

