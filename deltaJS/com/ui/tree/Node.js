
Node.super = [
    "delta.com.ui.Ui",
    "delta.com.dataStructure.tree.Node"
]

function Node(params){
    Super(this, params);
    this.buildView();

    params = params || {};
    this.guest = params.guest || "Empty node";
}

Node.properties = {
    _isCollapsed_       : true,
    _guest_             : null,
    _areChildrenLoaded_ : null,
    
    childrenLoaderClass : null,
    childrenLoader      : null,
    icon                : ' ',

    guest : {
        extractable : false,
        set : function setGuest(value){
            if(typeof value == "string" || typeof value == "number"){
                this.referenceToElements.guest.innerHTML = value;
            }else if(value.referenceToElements && value.referenceToElements.root){
                value.host = this;
                this.referenceToElements.guest.setContent(value);
            }
            this._guest_ = value;
        },
        get : function getGuest(){
            return this._guest_;
        }
    },

    isCollapsed : {
        set : function setCollapsed(value){
            if(this.children.length == 0 && this.areChildrenLoaded !== false){
                return;
            }
            this._isCollapsed_ = value;
            if(value){
                this.icon = '+';
            }else{
                this.icon = '-';
            }
        },
        get : function getCollapsed(){
            return this._isCollapsed_;
        }
    },

    areChildrenLoaded : {
        set : function setAreChildrenLoaded(value){
            if(value == null || this._areChildrenLoaded_) return;

            this._areChildrenLoaded_ = value;
            
            if(value == false){
                this.isCollapsed = true;
            }
        },
        get : function getAreChildrenLoaded(){
            return this._areChildrenLoaded_;
        }
    },

    addChild : function addChild(child){
        Super.Node.addChild.call(this, child);
        this.referenceToElements.children.appendView(child);
        if(this.children.length == 1) this.icon = '+';
    },

    removeChild : function addChild(child){
        Super.Node.removeChild.call(this, child);
        this.referenceToElements.children.removeView(child);
        if(this.children.length == 0) this.icon = ' ';
    },

    tryToggleCollapse : function tryToggleCollapse(){
        if(this.areChildrenLoaded === false){
            this.loadChildren();
            return;
        }
        this.toggleCollapse();
    },

    expand : function expand(){
        if(this.areChildrenLoaded === false){
            this.loadChildren();
            return;
        }
        if(!this.children.length) return;
        this.isCollapsed = false;
    },

    loadChildren : function loadChildren( ){
        if(this.childrenLoader){
            return;
        }
        this.childrenLoader = new this.childrenLoaderClass({
            node : this
        });
        this.childrenLoader.load();
    },

    toggleCollapse : function toggleCollapse(){
        this.isCollapsed = !this.isCollapsed;
    },
};



