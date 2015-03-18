
var 
    TemplateBuilder         = include("delta.com.ui.TemplateBuilder"),
    ReferenceToElements     = include("delta.com.ui.ReferenceToElements")
;

Ui.Super = "delta.com.objectBase.ObjectBase";

function Ui(params){
    Super(this, params);
}

Ui.properties = {
    referenceToElements : {
        extractable : false
    },

    buildReferenceToElements : function buildReferenceToElements(template){
        this.referenceToElements = new ReferenceToElements({ root : template });
    },

    buildView : function buildView(viewNameSpace){
        var viewNameSpace   = viewNameSpace || this.constructor.nameSpace;
        var template        = TemplateBuilder.build(this, viewNameSpace);
        
        this.buildReferenceToElements(template);
        return template;
    }
}









