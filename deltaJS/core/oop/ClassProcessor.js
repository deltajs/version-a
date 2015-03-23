var 
    PropertiesDescriptionBuilder    = include("delta.core.oop.PropertiesDescriptionBuilder"),
    PrototypeBuilder                = include("delta.core.oop.PrototypeBuilder"),
    InheritanceBuilder              = include("delta.core.oop.InheritanceBuilder"),
    AncestryBuilder                 = include("delta.core.oop.AncestryBuilder"),
    SuperBuilder                    = include("delta.core.oop.SuperBuilder"),
    method                          = include("delta.core.method") 
;

function ClassProcessor( classs, nameSpace ){
    this.classs = classs;
    classs.nameSpace = nameSpace;
}

ClassProcessor.prototype = {
    classs       : null,
    allClasses   : null,

    buildAllClasses : function buildAllClasses(){
        var classs = this.classs;

        if(typeof classs.Super == "string"){
            this.allClasses = [ classs, classs.Super ]
        }else if(classs.Super == null){
            this.allClasses = [ classs ];
        }else if( Array.isArray(classs.Super) ){
            this.allClasses =  [ classs ].concat( classs.Super );
        }
    },

    prepareClasses : function prepareClasses(){
        var
            allClasses = this.allClasses,
            length = allClasses.length,
            tempAllClasses = [], classs, propertiesDescriptionBuilder
        ;

        while( length-- ){
            classs = allClasses[length];
            
            if(typeof classs == "string"){
                try {
                    classs = include(classs);
                } catch (e){
                    throw "Error loading " + classs + " as parent class for " + this.classs.name + "\n" + e ;
                }
            }

            if(!classs.properties){
                propertiesDescriptionBuilder = new PropertiesDescriptionBuilder(classs);
                classs.properties = propertiesDescriptionBuilder.build();
            }

            tempAllClasses.push( classs );
        }

        tempAllClasses.reverse();
        this.allClasses = tempAllClasses;
    },

    buildPropertiesDescription : function buildPropertiesDescription( ){
        var
            propertiesDescriptionBuilder    = new PropertiesDescriptionBuilder(this.classs),
            propertiesDescription           = propertiesDescriptionBuilder.build()
        ;

        this.propertiesDescription = propertiesDescription;
        this.classs.properties = propertiesDescription;
    },

    buildInheritance : function buildInheritance( ){
        this.prepareClasses();
        var
            inheritanceBuilder = new InheritanceBuilder(this.allClasses),
            propertiesDescription = inheritanceBuilder.build()
        ;

        this.propertiesDescription = propertiesDescription;
        this.classs.properties = propertiesDescription;
    }, 

    buildNewPrototype : function buildNewPrototype( ){
        var
            prototypeBuilder    = new PrototypeBuilder(this.propertiesDescription),
            newPrototype        = prototypeBuilder.build()
        ;
        this.classs.prototype = newPrototype;
    },

    buildMetadata : function buildMetadata( ){
        var parentClasses = [].concat( this.allClasses );
        parentClasses.shift();

        this.classs.metaData = {
            parentClasses : parentClasses
        };
    },

    buildDinamicConstructor : function buildDinamicConstructor(){
        var 
            classs = this.classs,
            argumentsToPass = method.getArguments(classs).join(','),
            code =
                "classs.dinamicConstructor = function "+
                classs.name + "DinamicConstructor (" + argumentsToPass + "){ return new classs( " + argumentsToPass + "); };"
        ;

        evalDinamicConstructor(classs, code);
    },

    buildAncestry : function buildAncestry(){
        var
            classs = this.classs,
            ancestryBuilder = new AncestryBuilder(classs);
        ;
        classs.metaData.ancestry = ancestryBuilder.build();
    },

    buildSuper : function buildSuper(){
        var
            classs = this.classs,
            superBuilder = new SuperBuilder(classs)
        ;
        
        this.classs.Super = superBuilder.build();
    },

    callProcessClassFromAncestry : function callProcessClassFromAncestry(){
        var
            classs = this.classs,
            ancestor, index = 0,
            ancestry = classs.metaData.ancestry
            length = ancestry.length
        ;

        for(;index<length;index++){
            ancestor = ancestry[index];
            if(ancestor.processSubClass){
                ancestor.processSubClass(classs);
            }
        }
    },

    process : function process(){
        this.buildAllClasses();
        this.buildPropertiesDescription();
        this.buildInheritance();
        this.buildNewPrototype();
        this.buildMetadata();
        this.buildDinamicConstructor();
        this.buildAncestry();
        this.buildSuper();
        this.callProcessClassFromAncestry();
    },

}

function evalDinamicConstructor(classs){
    eval(arguments[1]);
}