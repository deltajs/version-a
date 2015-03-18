
var
    StringField         = include("delta.com.ui.form.field.StringField"),
    rivets              = include("delta.core.com.rivets"),
    TemplateLoader      = include("delta.com.ui.TemplateLoader")
;

FormTemplateBuilder.super = 'delta.com.ObjectBase';

function FormTemplateBuilder(params){
    Super(this, params);

    this.modelType  = this.form.modelType;
    this.fieldsType = this.form.fieldsType || {};
    this.model      = this.form.model;
}

FormTemplateBuilder.properties = {
    form            : null,
    modelType       : null,
    fieldsType      : null,
    rootElement     : null,
    viewNameSpace   : null,
    fieldsElement   : null,

    buildFieldDescription : function buildFieldDescription(propertyName){
        var fieldDescription = this.fieldsType[ propertyName ] || {};

        fieldDescription.type = fieldDescription.type || StringField;
        fieldDescription.name = propertyName;
        fieldDescription.formRootElement = this.rootElement;
        fieldDescription.form = this.form;
        fieldDescription.eventBus = this.form.eventBus;

        return fieldDescription;
    },

    buildField : function buildField(propertyName){
        var 
            fieldDescription = this.buildFieldDescription(propertyName),
            type, field
        ;

        type = fieldDescription.type;
        field = new type(fieldDescription);
        this.fieldsElement.appendView(field);

        return field;
    },

    buildFields : function buildFields(form, formElement){
        var
            properties = this.modelType.metaData.propertiesToSerialize,
            index = 0, length = properties.length, propertyName, propertyData
        ;
        
        for(;index<length;index++){
            propertyName = properties[ index ];
            propertyData = this.modelType.properties[propertyName];
            if(propertyData.editable === false){
                continue;
            }
            
            this.form.fields[propertyName] = this.buildField( propertyName );
        }
    },

    buildTemplate : function buildRootElement( ){
        var
            viewNameSpace = this.viewNameSpace
        ;

        if(viewNameSpace){
            this.rootElement = TemplateLoader.load(viewNameSpace);
        }else{
            this.rootElement = "<form rv-status='staus'><fields></fields></form>".toHtml()
        }

        this.fieldsElement = this.rootElement.querySelector("fields");
    },

    buildFormTemplate : function buildFormTemplate(){
        this.buildTemplate();
        rivets.bind(this.rootElement, this.form);
        this.buildFields();

        return this.rootElement;
    }
};


FormTemplateBuilder.build = function build(form, viewNameSpace){
    var formTemplateBuilder = new FormTemplateBuilder({
        form            : form,
        viewNameSpace   : viewNameSpace
    });
    return formTemplateBuilder.buildFormTemplate();
}







