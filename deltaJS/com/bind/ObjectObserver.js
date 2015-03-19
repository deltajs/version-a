
var
	ObjectObserverNode = include( parentNameSpace + ".ObjectObserverNode"),
    Propagator = include( parentNameSpace + ".Propagator")
;

ObjectObserver.Super = "delta.com.dataStructure.graph.Graph";

function ObjectObserver(params){
	Super(this, params);
    this.notifier = Object.getNotifier(this);
    Object.observe(this, Propagator.propagate, ['propagate']);
}

ObjectObserver.properties = {
    isSubscribed    : false,
    nodeType 	    : ObjectObserverNode,
    rootObject      : null,
    graph   	    : null,
    tempObject 	    : null,
    notifier        : null,

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
            object : this.rootObject
        });

        this.walkPathByIds(path, callback );
    },

    bindNodeWithObject : function bindNodeWithObject( node, totalSteps, stepsLeft ){
        var mustNotify = totalSteps - stepsLeft == totalSteps;
        if(!node.notifier) node.bind( this.object, mustNotify, this.objectObserver.notifier);

        if(!(node.propertyName in this.object)){
            throw "Path " + node.is + " don't exist in object";
        }

        this.object = this.object[node.propertyName];
    },

    rebindNodeWithObject : function rebindNodeWithObject(node){
        if(this.sourceNode == node)return;

        var
            parentNode = node.parent,
            sourceObject = parentNode.sourceObject[parentNode.propertyName]
        ;
        node.bind(sourceObject, node.notifier.mustNotify, this.objectObserver.notifier);
    },

    rebindPathToLeafsFromNode : function rebindPathToLeafsFromNode( node ){
        var callback = this.rebindNodeWithObject.bind({
            objectObserver  : this,
            sourceNode      : node
        });
        node.traverseToLeafs(callback);
    }
};

ObjectObserver.instances = new Map();
ObjectObserver.build = function observe(object){
    return ObjectObserver.instances.get(object) || new ObjectObserver({rootObject : object});
}

