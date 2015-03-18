
CkeditorField.super = "delta.com.ui.form.field.FieldBase";

function CkeditorField(params){
    Super(this, params);
    this.buildView();

    this.buildEditor = this.buildEditor.bind(this);
    this.destroyEditor = this.destroyEditor.bind(this);
    
    this.formRootElement.addEventListener('attached', this.buildEditor);
    this.formRootElement.addEventListener('ancestorattached', this.buildEditor);

    this.formRootElement.addEventListener("beforeancestordetached", this.destroyEditor );
    this.formRootElement.addEventListener("beforedetached", this.destroyEditor );

    this.modifyModel();
}

CkeditorField.properties = {
    configuration   : null,
    editor          : null,
    data            : null,

    modifyModel : function modifyModel(){
        var me = this;
        Object.defineProperty(this.form.model, this.name, {
            get : function ckeditorFieldContent(){
                if(!me.editor) return me.data;
                return me.editor.getData();
            }
        });
    },

    buildEditor : function buildEditor(){
        var container = this.referenceToElements.root.querySelector("[rv-bind-ckeditor]");
        this.editor = CKEDITOR.appendTo( container , this.configuration, this.data);
    },

    destroyEditor : function destroyEditor(){
        this.data = this.editor.getData();
        this.editor.destroy();
        this.editor = null;
    },

    updateModel : function updateModel(){
    },

    set value(htmlString){
        if(this.editor){
            this.editor.setData(htmlString);
        }else{
            this.data = htmlString;
        }
    }
};


