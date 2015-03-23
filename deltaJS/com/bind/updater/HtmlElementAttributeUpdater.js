
function HtmlElementAttributeUpdater(params){
}

HtmlElementAttributeUpdater.properties = {
    update : function update(change, relationship){
        var
            targetObject        = relationship.targetObject,
            targetPropertyName  = relationship.propertyName,
            sourceObject        = change.sourceObject,
            sourcePropertyName  = change.propertyName
        ;

        targetObject.setAttribute( targetPropertyName, sourceObject[sourcePropertyName] );
    }
};
