
var 
    EventBus = include("delta.com.event.EventBus")
;

EventBusDispatcher.super = "delta.com.ObjectBase";

function EventBusDispatcher(params){
    Super(this, params);
}

EventBusDispatcher.properties = {
    eventBus 	: null,
    eventData 	: null,

    modifyEvent : function modifyEvent( event ){
        if(this.eventData == null){
            return;
        }
        var key;
    	for(key in this.eventData){
    		event[key] = this.eventData[key];
    	}
    },

    dispatchEvent : function dispatchEvent (eventName, event){
        if(this.eventBus){
            this.modifyEvent(event);
            this.eventBus.dispatchEvent(eventName, event);
        }
    }
};













