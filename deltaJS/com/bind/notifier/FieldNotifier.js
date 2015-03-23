
FieldNotifier.Super = "delta.com.objectBase.ObjectBase";

function FieldNotifier(params){
    Super(this, params);

    this.bindAccessors();
    this.notify();
}

FieldNotifier.properties = {
    fieldValue              : null,

    propertyRelationships   : null,
    notifier                : null,
    rootObject              : null,
    sourceObject            : null,
    propertyName            : null,
    propertyDescriptor      : null,
    path                    : null,
    mustNotify              : null,
    node                    : null,

    bindAccessors : function bindAccessors(){
        this.set = this.set.bind( this );
        this.get = this.get.bind( this );
    },

    react : function react(){
        this.notify();
        if(this.node.isLeaf) return;
        this.node.rebindPathToLeafs();
    },

    notify : function notify( ){
        if( !this.mustNotify )return;
        this.notifier.notify({
            type                    : 'propagate',
            rootObject              : this.rootObject,
            sourceObject            : this.sourceObject,
            propertyName            : this.propertyName,
            path                    : this.path,
            propertyRelationships   : this.propertyRelationships
        });
    },

    set : function fieldSetter(value){
        this.fieldValue = value;
        this.react();
    },

    get : function fieldGetter(){
        return this.fieldValue;
    }
}

