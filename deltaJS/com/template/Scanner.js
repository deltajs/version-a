
Scanner.Super = "delta.com.objectBase.ObjectBase";

function Scanner(params){
    Super(this, params);
    this.processNode = this.processNode.bind(this);
}

Scanner.properties = {
    rootElement : null,
    
    processNode : function processNode( node ){
        if(node instanceof Text) this.processTextNode( node );
        else this.processHTMLElement(node);
    },

    processHTMLElement : function processHTMLElement( element ){
        console.log(">", element);
    },

    processTextNode : function processTextNode( textNode ){
        console.log(">>", textNode);
    },

    scan : function scan(){
        this.rootElement.traverseChildNodes( this.processNode )
    }
}
