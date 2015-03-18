
var
	ObjectObserverNode = include(parentNameSpace + ".ObjectObserverNode")
;

ObjectObserver.Super = "delta.com.dataStructure.graph.Graph";

function ObjectObserver(params){
	Super(this, params);
    console.log(this.nodeType);
}

ObjectObserver.properties = {
    nodeType 	: ObjectObserverNode,
    object  	: null,
    graph   	: null,
    tempObject 	: null,

    observePath : function observePath(pathData){
        var path = this.buildPathArray( pathData );
        
        this.buildPath( path );
        this.bindNodesWithObject( path );
    },

    buildPathArray :  function buildPathArray( path ){
        path = path.split( "." );
        var
            newPath = [],
            index = 1,
            length = path.length + 1,
            id
        ;

        for(;index<length;index++){
            id = path.slice(0,index).join(".");
            newPath.push(id);
        }
        return newPath;
    },

    bindNodesWithObject : function bindNodesWithObject( path ){
        var callback = this.bindNodeWithObject.bind({
            objectObserver : this,
            object : this.object
        });

        this.walkPathByIds(path, callback );
    },

    bindNodeWithObject : function bindNodeWithObject( node ){
        
        node.bind( this.object );
        this.object = this.object[node.id];
    }
};


