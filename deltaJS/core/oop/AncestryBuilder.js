
function AncestryBuilder(classs){
    this.classs         = classs;
    this.parentClasses  = classs.metaData.parentClasses;
    this.ancestry       = new Set();
}

AncestryBuilder.prototype = {
    parentClasses : null,

    addToAncestry : function addToAncestry( parentClasses ){
        var
            index = 0, length = parentClasses.length,
            parentClass, ancestry = this.ancestry
        ;

        for(;index<length;index++){
            parentClass = parentClasses[index];
            
            if(!parentClass.metaData){
                continue;
            }
            
            this.addToAncestry( parentClass.metaData.parentClasses );
            ancestry.add( parentClass );
        }
    },

    buildAncestryArray : function buildAncestryArray(){
        var
            superClasses = this.ancestry.values(),
            ancestry = [], value
        ;

        while(true){
            value = superClasses.next()
            if(value.done)break;
            ancestry.push(value.value);
        }

        this.ancestry = ancestry;
    },

    build : function build(){
        this.addToAncestry(this.parentClasses);
        this.buildAncestryArray();

        return this.ancestry;
    }
}


