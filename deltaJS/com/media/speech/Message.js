
Message.super = 'delta.com.event.EventTreeNode';

function Message(params){
    Super(this, params);
    
    if(!this.text && !this.lines){ throw "lines or text must be provided" };

    this.defineVoice();
    this.splitText();
    this.buildSentences();
}

Message.properties = {
    lines           : null,
    text            : null,
    sentences       : { type: Array },
    voice           : null,
    currentSentence : null,
    sentenceIndex   : 0,

    splitText : function splitText(){
        if(!this.text) return;

        var
            text = this.text.removeHtmlTags(),
            lines = text.split(/(?:\.|:)(?!\d)[\s\n\r\t]*|[\n\r]+/),
            line, index = 0, finalLines = []
        ;
        delete this.text;

        for(index in lines){
            line = lines[index];
            if(line.isEmpty){
                continue;
            }
            finalLines.push(line);
        }
        this.lines = finalLines;
    },

    buildSentences : function buildSentences(){
        var
            lines = this.lines,
            index, line, sentence
        ;
        delete this.lines;
        for(index in lines){
            sentence = new SpeechSynthesisUtterance(lines[index]);
            sentence.voice = this.voice;
            sentence.addEventListener("start", this.onStartSentence.bind(this) );
            sentence.addEventListener("end", this.onEndSentence.bind(this) );
            this.sentences.push(sentence);
        }
    },

    onStartSentence : function onSentenceStart(event){
        this.currentSentence = event.target;
        if(this.sentenceIndex == 0){
            this.dispatchEventToTop("onStartHearingMessage", event);
        }
        this.dispatchEventToTop("onStartHearingSentence", event);
    },

    onEndSentence :  function onSentenceEnd(event){
        this.sentenceIndex++;
        this.dispatchEventToTop("onEndHearingSentence", event);
        if(this.sentenceIndex == this.sentences.length){
            this.dispatchEventToTop("onEndHearingMessage", event);
            this.sentenceIndex = 0;
            this.currentSentence = null;
        }
    },

    hear : function hear(){
        var
            sentences = this.sentences,
            index, sentence
        ;
        
        this.sentenceIndex = 0;
        this.currentSentence = null;

        for(index in sentences){
            sentence = sentences[index];
            speechSynthesis.speak(sentence);
        }
    },

    defineVoice : function defineVoice(){
        var
            voice = this.voice
        ;

        if(typeof voice == "string" || Array.isArray(voice)){
            voice = Message.getVoiceByUri(voice);
        }else if(!voice){
            return;
        }
        this.voice = voice;
    }
}

Message.cancelAll = function cancelAll(){
    speechSynthesis.cancel();
}

Message.pause = function pause(){
    speechSynthesis.pause();
}

Message.resume = function resume(){
    speechSynthesis.resume();
}


Message.buildVoicesByUri = function buildVoicesByUri(){
    var
        index,
        voicesByIndex = speechSynthesis.getVoices(),
        voicesByUri, voice
    ;

    this.voicesByIndex = voicesByIndex;
    this.voicesByUri = voicesByUri = {};
    this.voicesURI = [];

    for(index in voicesByIndex){
        voice = voicesByIndex[index];
        this.voicesURI.push(voice.voiceURI);
        voicesByUri[voice.voiceURI] = voice;
    }

    return voicesByUri;
}

Message.getVoiceByUri = function getVoiceByUri(uri){
    var
        voicesByUri = this.voicesByUri,
        index, length, voice
    ;
    if(typeof uri == "string"){
        return voicesByUri[uri];
    }

    length = uri.length;
    for(index=0;index<length;index++){
        voice = voicesByUri[uri[index]];
        if(voice){
            return voice;
        }
    }
    throw "Voice uri " + uri.join(", ") + " is not available. Voices available:\n" + Message.voicesURI.join("\n");
}

speechSynthesis.onvoiceschanged = function() {
    Message.buildVoicesByUri();
}



