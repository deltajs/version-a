
var
    GraphNode = include(parentNameSpace , ".GraphNode")
;

Graph.Super = "delta.com.objectBase.ObjectBase";

function Graph(params){
    Super(this, params);
}

Graph.properties = {
    nodeType : GraphNode,

    nodes : {
        type : Object
    },

    rootNodes : {
        type : Array
    },

    buildNode : function buildNode( nodeId ){    
        var data = {
            id      : nodeId,
            graph   : this
        };

        if( this.nodes[nodeId] ){
            return this.nodes[nodeId];
        }

        var node = new this.nodeType(data);
        this.nodes[ nodeId ] = node;
        return node;
    },

    buildPath : function buildPath( pathData ){
        var
            length = pathData.length, index = 0,
            nodeId, lastNode, node
        ;

        for(;index<length;index++){
            nodeId      = pathData[ index ];
            node        = this.buildNode(nodeId);

            if(index == 0)this.rootNodes.push(node);
            if(lastNode) lastNode.adoptChild( node );
            
            lastNode = node;
        }
    },

    getNodeById : function getNodeById( nodeId ){
        return this.nodes[ nodeId ];
    },

    checkPathByNodesId : function checkPathByNodesId( pathData, nodes ){
        var node;

        if(!nodes){
            nodes = this.rootNodes;
            pathData = pathData.slice();
        }

        node = this.getNodeById( pathData.shift() );

        if( nodes.indexOf( node ) == -1 ){
            return false;
        }else if(pathData.length == 0){
            return true;
        }else {
            return this.checkPathByNodesId(pathData, node.children);
        }
    },

    traverseToLeafsFromNodeId : function traverseToLeafsFromId( nodeId, callback ){
        var
            node = this.getNodeById( nodeId )
        ;
        node.traverseToLeafs(callback);
    },

    walkPathByIds : function walkPathByIds(pathData, callback, nodes, totalSteps){
        if(!nodes){
            nodes = this.rootNodes;
            pathData = pathData.slice();
            totalSteps = pathData.length;
        }

        var
            id = pathData.shift(),
            node = this.getNodeById( id ),
            stepsLeft = pathData.length
        ;

        if( nodes.indexOf( node ) == -1 ){
            throw "Path don't exist in graph";
        }

        callback(node, totalSteps, stepsLeft);

        if(pathData.length == 0){
            return;
        }else {
            this.walkPathByIds(pathData, callback, node.children, totalSteps);
        }
    }
};


