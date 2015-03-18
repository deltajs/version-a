
var
    FormTemplateBuilder = include("delta.com.ui.form.FormTemplateBuilder"),
    ReferenceToElements = include("delta.com.ui.ReferenceToElements"),
    Catalog = include("delta.com.dataStructure.hashMap.Catalog"),
    EventBus = include("delta.com.event.EventBus")
;

Form.super = "delta.com.ui.Ui";

function Form(params){
    Super(this, params);
    this.eventBus.subscribeListener(this);
}

Form.properties = {
    _modelType_     : null,

    model           : null,
    fieldsTypes     : null,
    status          : 'unedited',
    parent          : null,
    viewNameSpace   : null,

    eventBus : {
        enumerable  : false,
        type        : EventBus
    },

    fields : {
        enumerable  : false,
        type        : Catalog
    },

    modelType : {
        set : function setModelType(value){
            this._modelType_ = value;
            this.model = new value();
        },
        get : function getModelType(){
            return this._modelType_;
        }
    },

    buildReferenceToElements : function buildReferenceToElements(template){
        this.referenceToElements = new ReferenceToElements({ root : template });
    },

    buildForm : function buildForm(viewNameSpace){
        var template = FormTemplateBuilder.build(this, viewNameSpace || this.viewNameSpace);
        this.buildReferenceToElements(template);
        return template;
    },

    onFieldEdited : function onFieldEdited(event){
        var
            fields = this.checkFields(),
            event = {
                dispatcher: this,
                fields : fields
            },
            eventName = fields.invalid.length ? "onInvalidForm" : "onValidForm"
        ;
        this.dispatchEvent(eventName, event);
    },

    checkFields : function checkFields(){
        var
            fields = this.fields,
            fieldName, field, invalidFields = [],
            validFields = []
        ;

        for(fieldName in fields){
            field = fields[fieldName];
            if(field.status == "invalid"){
                this.status = "invalid";
                this.invalidFields.push(field);
                return;
            }else{
                this.validFields.push(field);
            }
        }

        return {
            invalid : invalidFields,
            valid : validFields
        }
    },

    deserializeFrom : function deserializeFrom(data){
        if(data == null){
            return
        }
        
        var
            fieldName, field,
            fields = this.fields
        ;
        
        data = Object.keyClone(data);

        for(fieldName in fields){
            field = fields[fieldName];
            field.value = data[fieldName];
            delete data[fieldName];
            field.updateModel();
        }
        
        this.model.deserializeFrom(data);
    },

    serialize : function serialize(){
        return this.model.serialize();
    }
};

