
function Updater(){}

Updater.instances = {};
Updater.register = function registerUpdateTransaction(){
    var
    	index = 0, length = arguments.length, updaterClasss
	;

    for(;index<length;index++){

        updaterClasss = arguments[index];
        if(typeof updaterClasss == "string") updaterClasss = include(updaterClasss);

        Updater.instances[updaterClasss.name] = updaterClasss;
    }
};

Updater.getByName = function getByName(name){
	return this.instances[name];
};