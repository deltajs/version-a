
InputFieldBase.super = "delta.com.ui.form.field.FieldBase"

function InputFieldBase(params){
    Super(this, params);
    this.buildView();

    this.onInputChange = this.onInputChange.bind(this);
    this.addEventListenersToInput();
}

InputFieldBase. properties = {
    inputChangeEventName : "change",

    addEventListenersToInput : function addEventListenersToInput(){
        var input = this.referenceToElements.input;
        input.addEventListener(this.inputChangeEventName, this.onInputChange);
    },

    onInputChange : function onInputChange(event){
        this.updateModel();
    },

    castValue : function castValue(value){
        return value;
    },

    updateModel : function updateModel(){
        try{
            this.form.model[this.name] = this.castValue( this.referenceToElements.input.value );
            this.status = "valid";
            this.eventBus.dispatchEvent("onFieldEdited", {
                dispatcher:this
            });
        }catch(exception){
            this.status = 'invalid';
        }
    },

    set value(value){
        this.referenceToElements.input.value = value;
    }
};




