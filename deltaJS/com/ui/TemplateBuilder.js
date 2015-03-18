var
    rivets              = include("delta.core.com.rivets"),
    TemplateLoader      = include("delta.com.ui.TemplateLoader")
;

TemplateBuilder.Super = "delta.com.objectBase.ObjectBase";

function TemplateBuilder(params){
    Super(this, params);
}

TemplateBuilder.properties = {
    build : function build(instance, viewNameSpace){
        var template = TemplateLoader.load(viewNameSpace);
        rivets.bind(template, instance);
        return template;
    }
};

TemplateBuilder.build = function build(instance, viewNameSpace){
    if(TemplateBuilder.instance == null){
        TemplateBuilder.instance = new TemplateBuilder();
    }
    return TemplateBuilder.instance.build(instance, viewNameSpace);
};

