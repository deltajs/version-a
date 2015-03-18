
var 
    ReferenceToElements = include("delta.com.ui.ReferenceToElements")
;

FieldBase.super = [
    "delta.com.ui.Ui",
    "delta.com.ObjectBase"
];

function FieldBase(params){
    Super(this, params);
    this.label = this.name.camelCaseToSentence();
}

FieldBase.properties = {
    status          : 'unedited',
    name            : '',
    eventBus        : null,
    formRootElement : null,
    form            : null,
    label           : null,

    buildReferenceToElements : function buildReferenceToElements(template){
        this.referenceToElements = new ReferenceToElements({
            root : template,
            querySelectorString : 'field-reference'
        });
    },

    dispatchEvent : function dispatchEvent(eventName, event){
        if(!this.eventBus){
            return
        }
        this.eventBus.dispatchEvent(eventName, event);
    }
};


