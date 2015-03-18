
IntField.super = "delta.com.ui.form.field.InputFieldBase";

function IntField(params){
    Super(this, params);
    this.referenceToElements.input.addEventListener("keypress", this.onlyNumbers);
}

IntField.properties = {
    inputChangeEventName : "input",

    onlyNumbers : function onlyNumbers (event){
        input = event.target;

        var key = event.keyCode || event.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\./;
        if( !regex.test(key) || (key == '.' && input.value.indexOf('.') != -1)) {
            event.returnValue = false;
            if(event.preventDefault){
                event.preventDefault();
            }
            return;
        }
    },

    castValue : function castValue(value){
        return parseInt(value);
    }
};


