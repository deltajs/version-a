
var
    ClassProcessor = include("delta.core.oop.ClassProcessor")
;

var oop = {
    processClass: function processClass(classs, nameSpace){
        if( typeof classs != "function" ) return;
        if( !oop.hasClassName(classs) ) return;

        var classProcessor = new ClassProcessor(classs, nameSpace);
        classProcessor.process();
    },

    hasClassName : function hasClassName(classs){
        var
            firstLetter = classs.name.substr(0,1);
        ;

        if(firstLetter == firstLetter.toUpperCase()){
            return true
        }
        return false;
    },
};





