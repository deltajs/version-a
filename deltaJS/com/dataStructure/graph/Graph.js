
var
    GraphNode = include(parentNameSpace + ".GraphNode")
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

    buildNode : function buildNode( data ){
        if(data.constructor == GraphNode) return data;

        if(typeof data == "string"){
            if( this.nodes[ data ] ) return this.nodes[ data ];
            data = {
                id : data,
                graph : this
            };
        }

        var node = new this.nodeType(data);
        this.nodes[ data.id ] = node;
        return node;
    },

    buildPath : function buildPath( pathData ){
        var
            length = pathData.length, index = 0,
            nodeData, lastNode, node
        ;

        for(;index<length;index++){
            nodeData    = pathData[ index ];
            node        = this.buildNode(nodeData);

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

    traverseToLeafsFromId : function traverseToLeafsFromId( nodeId, callback ){
        var
            node = this.getNodeById( nodeId )
        ;
        node.traverseToLeafs(callback);
    },

    walkPathByIds : function walkPathByIds(pathData, callback, nodes){
        if(!nodes){
            nodes = this.rootNodes;
            pathData = pathData.slice();
        }

        var
            id = pathData.shift(),
            node = this.getNodeById( id )
        ;

        if( nodes.indexOf( node ) == -1 ){
            throw "Path don't exist in graph";
        }

        callback(node);

        if(pathData.length == 0){
            return;
        }else {
            this.walkPathByIds(pathData, callback, node.children);
        }
    }
};


