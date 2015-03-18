EventDispatcher.super = 'delta.com.ObjectBase'

function EventDispatcher(params){
    Super(this, params);
}

EventDispatcher.properties = {    
    _eventListeners_:{
        enumerable      : false,
        configurable    : false,
        writable        : false,
        type : Object
    },

    addEventListener:{
        enumerable      : false,
        configurable    : false,
        writable        : false,
        value:function(eventName, listener, scope){
            var
                listeners = this._eventListeners_,
                list = listeners[eventName] || []
            ;
            if(!listeners[eventName]){
                listeners[eventName] = list;
            }
            list.push([listener, scope || this]);
        }
    },

    dispatchEvent:{
        enumerable      :false,
        configurable    :false,
        writable        :false,
        value:function(eventName, event){
            event = event || {};
            event.dispatcher = this;
            var
                list = this._eventListeners_[eventName],
                index
            ;
            for(index in list){
                index = list[index];
                index[0].call(index[1], event);
            }
        }
    }
}