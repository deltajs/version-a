
Node.Super = "delta.com.objectBase.ObjectBase";

function Node(params){
    Super(this, params);
}

Node.properties = {
    parent : null,

    children : {
        type : Array
    },

    get isLeaf() {
        return this.children.length == 0;
    },

    get root(){
        if(!this.parent)return this;
        return this.parent.root;
    },

    get isRoot(){
        if(!this.parent)return true;
        return false;
    },

    get index(){
        if(!this.parent) return null;
        return this.parent.children.indexOf(this);
    },

    get previous(){
        if(!this.parent)return null;
        return this.parent.children[this.index - 1]
    },

    get next(){
        if(!this.parent)return null;
        return this.parent.children[this.index + 1]
    },

    getNextToTraverse : function getNextToTraverse(traverseChildren){
        if(this.children.length && traverseChildren !== false){
            return this.children[0];
        }
        
        var next = this.next;
        if(next) return next;

        if(this.parent) return this.parent.getNextToTraverse(false);
    },

    get nextToTraverse(){
        return this.getNextToTraverse();
    },

    hasChild : function hasChild(child){
        if( this.children.indexOf(child) > -1) return true;
        return false;
    },

    adoptChild : function adoptChild(child){
        if( !this.hasChild(child) ){
            this.addChild(child);
        }
    },

    addChild : function addChild (child){
        child.parent = this;
        this.children.push(child);
    },

    removeChild : function removeChild( child ){
        child.parent = null;
        this.children.remove(child);
    },

    remove : function remove(){
        if(!this.parent)return;
        this.parent.removeChild(this);
    },

    addChildren : function addChildren(children){
        var 
            length = children.length,
            index = 0
        ;

        for(;index<length;index++){
            this.addChild( children[index] );
        }
    },

    traverseToRoot : function traverseToRoot(callBack){
        var
            newArrguments = [],
            length = arguments.length,
            index = 1
        ;
        for(;index<length;index++){
            newArrguments.push(arguments[index]);
        }
        this._traverseToRoot_(callBack, newArrguments);
    },

    _traverseToRoot_ : function _traverseToRoot_(callBack, params){
        if( callBack.apply(this, params) === false ){
            return;
        }
        if(!this.parent){
            return;
        }
        this.parent._traverseToRoot_(callBack, params);
    },

    traverseToLeafs :  function traverseToLeafs(callBack, done, distance){
        if( done == null ) done = new Map();
        if( distance == null ) distance = 0;
        if( done.get( this ) ) return;

        done.set(this, true);

        if( callBack(this, distance) == false ) return;

        var
            index = 0, length = this.children.length, child
        ;
        
        distance++;

        for(;index<length;index++){
            child = this.children[index];
            child.traverseToLeafs(callBack, done, distance);
        }
    }
};



