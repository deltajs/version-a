
function FieldUpdater(){
}

FieldUpdater.properties = {
    update : function update(change, relationship){
        var
            targetObject        = relationship.targetObject,
            targetPropertyName  = relationship.propertyName,
            sourceObject        = change.sourceObject,
            sourcePropertyName  = change.propertyName
        ;

        //console.log(targetObject, sourceObject, sourcePropertyName);

        targetObject[targetPropertyName] = sourceObject[sourcePropertyName];
    }
};


