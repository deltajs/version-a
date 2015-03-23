function Updater(){}

Updater.instances = {};
Updater.register = function registerUpdateTransaction(){
    var
        index = 0, length = arguments.length, updaterClasss
    ;

    for(;index<length;index++){

        updaterClasss = arguments[index];
        if(typeof updaterClasss == "string") updaterClasss = include(updaterClasss);
        this.instances[updaterClasss.name] = updaterClasss;
    }
};

Updater.getByName = function getByName(name){
    if(!(name in this.instances)){
        throw "Updater class " + name + " is not registered";
    }
    return this.instances[name];
};