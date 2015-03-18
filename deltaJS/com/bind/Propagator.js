

function Propagator(){}

Propagator.propagateChanges = function propagate(changes){
    var
        index = 0, length = changes.length, change
    ;

    for(;index<length;index++){
        var change = changes[index];
        this.propagateChange(change);
    }
};
Propagator.propagateChanges = Propagator.propagateChanges.bind(Propagator);

Propagator.propagateChange = function propagateChange(change){
    var
        propertyRelationships = change.propertyRelationships,
        index = 0, length = propertyRelationships.length, relationship
    ;

    for(;index < length;index++){
        relationship = propertyRelationships[index];
        this.propagateChangeToRelationship(change, relationship);
    }
};

Propagator.propagateChangeToRelationship = function propagateChangeToRelationship(change, relationship){
    relationship.updater.update(change, relationship);
}


