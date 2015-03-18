Propagator.Super = "delta.com.objectBase.ObjectBase";

function Propagator(params){
    Super(this, params);
}

Propagator.propagate = function propagate(changes){
    console.log(changes);
}

