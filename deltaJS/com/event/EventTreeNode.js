
EventTreeNode.super = [
    "delta.com.dataStructure.tree.Node",
    "delta.com.event.EventBus"
];

function EventTreeNode(params){
    Super(this, params);
}

EventTreeNode.properties = {
    dispatchEventToTop : {
        enumerable      : false,
        configurable    : false,
        value : function dispatchToTop(eventName, event){
            event = event || {};
            event.dispatcher = this;

            this.traverseToRoot(this.invokeCallbacks, eventName, event);
        }
    },

    invokeCallbacks : {
        enumerable      : false,
        configurable    : false,
        value : function invokeCallbacks(eventName, event){
            this.dispatchEvent(eventName, event);

            if(this == event.dispatcher){
                return;
            }

            if(this[eventName] instanceof Function){
                this[eventName](event);
            }
        }
    }
}
