

Sentence.super = "delta.com.ObjectBase";

function Sentence(params){
    Super(this, params);

    this.buildSpeechSynthesisUtterance();
}

Sentence.properties = {
    text                        : null,
    htmlElement                 : null,
    voice                       : null,
    speech                      : null,
    speechSynthesisUtterance    : null,

    buildSpeechSynthesisUtterance : function build( params ){
        var sentence;
        sentence = this.speechSynthesisUtterance = new SpeechSynthesisUtterance(this.text);
        //sentence.voice = this.voice;

        sentence.addEventListener("start", this.onStartSentence.bind(this) );
        sentence.addEventListener("end", this.onEndSentence.bind(this) );
    },

    play : function play( params ){
        this.afterStartSentence();
        speechSynthesis.speak(this.speechSynthesisUtterance);
    },

    afterStartSentence : function afterStartSentence( ){
        if(!this.speech || !this.speech.afterStartSentence) return;
        this.speech.afterStartSentence({
            dispatcher : this
        })
    },

    onStartSentence : function onStartSentence(){
        if(!this.speech || !this.speech.onStartSentence) return;
        this.speech.onStartSentence({
            dispatcher : this
        })
    },

    onEndSentence : function onEndSentence(event){
        if(!this.speech || !this.speech.onEndSentence) return;
        this.speech.onEndSentence({
            dispatcher : this
        })
    }
};
