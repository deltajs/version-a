
EventBus.super = 'delta.com.ObjectBase';

function EventBus(params){
    Super(this, params);
}

EventBus.properties = {
    _subscribers_: {
        configurable    : false,
        type            : Array
    },

    subscribeListener : function subscribeListener(listener){
        if(!this._subscribers_){
            this._subscribers_ = [];
        }
        this._subscribers_.push(listener);
    },

    dispatchEvent : function dispatchEvent (eventName, event){
        var
            subscribers = this._subscribers_,
            subscriber, index
        ;

        if(!subscribers){
            return;
        }

        event = event || {};
        if(!event.dispatcher){
            event.dispatcher = this;
        }

        for(index in subscribers){
            subscriber = subscribers[index];
            if(subscriber[eventName] instanceof Function){
                subscriber[eventName](event);
            }
        }
    }
};