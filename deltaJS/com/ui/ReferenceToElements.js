

ReferenceToElements.Super = "delta.com.objectBase.ObjectBase";

function ReferenceToElements(params){
    Super(this, params);
    this.extract(this.root);
}

ReferenceToElements.properties = {
    root : null,

    querySelectorString : {
        value : 'view-reference'
    },
    
    extract : function extract(){
        var
            elements = this.root.querySelectorAll("[" + this.querySelectorString + "]"),
            length = elements.length, element, index = 0, reference
        ;
        
        for(;index<length;index++){
            element = elements[index];
            reference = element.getAttribute( this.querySelectorString );
            this[reference] = element;
        }
    }
}