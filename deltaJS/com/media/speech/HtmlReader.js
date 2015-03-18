
var
    Sentence = include("delta.com.media.speech.Sentence")
;

HtmlReader.super = "delta.com.event.EventBusDispatcher";

function HtmlReader(params){
    Super(this, params);
}

HtmlReader.properties = {
    rootNode        : null,
    sentences       : {type : Array},
    index           : 0,
    isHtmlProcessed : false,

    processTextNode : function processTextNode (textNode) {
        var
            isEmpty = textNode.data.isEmpty
        ;
        
        if(isEmpty)return;
        this.splitNode(textNode);
    },

    splitNode : function splitNode( textNode ){
        var
            lines = this.splitText( textNode.data ),
            index = 0, length = lines.length, newNode, parentNode = textNode.parentNode,
            previousNode = textNode
        ;
        

        for(;index < length ; index++){

            newNode = ("<span class='all-readed'>" + lines[index] + "</span>").toHtml();

            parentNode.appendViewAfter(newNode, previousNode);
            this.buildSentence(lines[index], newNode);

            previousNode = newNode;
        }

        parentNode.removeChild(textNode);
    },

    splitText : function splitText(text){        
        var
            lines = text.split(/([\.:;])(?!\d)|([\n\r]+)/),
            index = 0, length = lines.length,
            line, finalLines = [], puntuacion = /^[\.:;\n\r]+$/
        ;

        for(;index<length;index++){
            line = lines[index];
            if(line == null) continue;
            if(line == "") continue;
            if(line.match(puntuacion) && finalLines.length > 0){
                finalLines[finalLines.length - 1] += line;
                continue
            }
            if(line.isEmpty)continue;

            finalLines.push(line);
        }

        return finalLines;
    },

    processHtml : function processHtml( ){
        if(this.isHtmlProcessed) return;
        this.isHtmlProcessed = true;

        var
            nodesToRead = this.rootNode.querySelectorAll("[read]"),
            index = 0; length = nodesToRead.length
        ;

        for (;index < length; index++) {
            this.processNode(nodesToRead[index]);
        };
    },

    processNode : function processNode( htmlNode ){
        var me = this;

        htmlNode.traverseChildNodes(function(node){
            if(node instanceof Text){
                me.processTextNode(node);
            }
        });
    },

    buildSentence : function buildSentence ( text, element ){
        this.sentences.push(new Sentence({
            text        : text,
            htmlElement : element,
            speech      : this
        }));
    },

    play : function play() {
        speechSynthesis.cancel();

        this.dispatchEvent("onStartPlaying", {
            dispatcher : this
        });

        this.processHtml();
        this.prepareElements();
        this.index = 0;
        this.sentences[0].play();
    },

    prepareElements : function prepareElements( ){
        var
            sentences = this.sentences,
            index = 0, length = sentences.length,
            element, sentence
        ;

        for(;index<length;index++){
            sentence = this.sentences[index];
            element = sentence.htmlElement;

            element.classList.remove("all-readed");
            element.classList.add( "not-readed");
        }
    },

    afterStartSentence : function afterStartSentence( event ){
        var
            sentence = event.dispatcher,
            element = sentence.htmlElement
        ;
        element.classList.remove("not-readed");
        element.classList.add("reading");
    },

    stop : function stop(){
        this.dispatchEvent("onStopPlaying", {
            dispatcher : this
        });

        speechSynthesis.cancel();
        this.index = this.sentences.length;
    },

    pause : function pause(){
        this.dispatchEvent("onPausePlaying", {
            dispatcher : this
        });

        speechSynthesis.pause();
    },

    onEndSentence : function onEndSentence( event ){
        var
            nextSentence = this.sentences[++this.index],
            sentence = event.dispatcher,
            element = sentence.htmlElement
        ;

        element.classList.remove("reading");
        element.classList.add("readed");

        if(!nextSentence){
            this.onEndAllSentences();
            return;
        }

        nextSentence.play();
    },

    onEndAllSentences : function onEndAllSentences(){
        var
            sentences = this.sentences,
            sentence,
            index = 0, length = sentences.length,
            element
        ;
        
        for(;index<length;index++){
            sentence = this.sentences[index];
            element = sentence.htmlElement;
            
            element.classList.remove("readed");
            element.classList.add("all-readed");
        }

        this.dispatchEvent("onFinishPlaying", {
            dispatcher : this
        });
    }
};

HtmlReader.resume = function resume(){
    speechSynthesis.resume();
}

