
var Message = include("delta.com.media.speech.Message");

Speech.super = 'delta.com.event.EventTreeNode';

function Speech(params){
    Super(this, params);
    var 
        messages
    ;
    if(params && (messages = params.messages)) {
        this.addMessages(messages);
    }
}

Speech.properties = {
    currentMessage : {
        enumerable  : false,
        value       : null,
    },

    messageIndex : {
        enumerable  : false,
        value       : 0,
    },

    hear : {
        configurable    : false,
        enumerable      : false,
        value : function hear(){
            var
                index = 0,
                messages = this.childs
            ;

            this.messageIndex = 0;
            this.currentMessage = null;

            Message.cancelAll();
            for(index in messages){
                messages[index].hear();
            }
        }
    },

    addMessages : {
        enumerable      : false,
        configurable    : false,
        value : function addMessages (){
            var 
                items = arguments[0],
                length,
                index = 0
            ;

            if(typeof items == "string" || items.constructor == Object || items instanceof Message){
                items = arguments;
            }

            length = items.length;
            for(;index<length;index++){
                this.addMessage( items[index] );
            }
        }
    },

    addMessage : {
        enumerable      : false,
        configurable    : false,
        value : function addMessage (message){
            if(typeof message == "string"){
                message = new Message({
                    text : message
                })
            }else if(message.constructor == Object){
                message = new Message( message )
            }
            this.addChild(message);
        }
    },

    onStartHearingMessage : {
        enumerable      : false,
        configurable    : false,
        value : function onStartHearingMessage(event){
            this.currentMessage = event.dispatcher;
            if(this.messageIndex == 0){
                this.dispatchEventToTop("onStartHearingSpeech", event);
            }
        }
    },

    onEndHearingMessage : {
        enumerable      : false,
        configurable    : false,
        value : function onEndHearingMessage(event){
            this.messageIndex++;
            if(this.messageIndex == this.childs.length){
                this.dispatchEventToTop("onEndHearingSpeech", event);
                this.messageIndex = 0;
                this.currentMessage = null;
            }
        }
    }
}