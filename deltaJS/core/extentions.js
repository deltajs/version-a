var
    extentions = {}
;

function attach(target, prop, value, enumerable, writable, configurable){
    Object.defineProperty( target, prop, {
        value:value,
        configurable: configurable || true,
        enumerable:enumerable || false,
        writable:writable || true
    });
}

attach( String.prototype, 'getWords', function getWords(regExp) {
    if (regExp != null) return r.split(regExp);
    return this.split(/[\s\t\n\.]+/);
});

attach( String.prototype, 'toCamelCase', function toCamelCase(){
    return this.replace(/([\-\s_]+[a-z])/g, function(m) {
        return m.toUpperCase().replace(/[\-\s_]/, '');
    }).replace(/\w/, function(m){
        return m.toLowerCase();
    }).replace(/[^\w]/,'');
});

attach( String.prototype, 'trim', function trim(){
    return this.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/, ' ');
});

attach( String.prototype, 'capitalize', function capitalize(){
    return this.substring(0,1).toUpperCase() + this.substring(1,this.length);
});

attach( String.prototype, 'decapitalize', function decapitalize(){
    return this.substring(0,1).toLowerCase() + this.substring(1,this.length);
});

attach( String.prototype, 'removeHtmlTags', function removeHtmlTags(){
    return this.replace(/<[^<>]*>/g, '');
});

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(searchString, position) {
      position = position || 0;
      return this.lastIndexOf(searchString, position) === position;
    }
  });
}

 

String.isEmptyRegExp = /^[\s\t\n\r]*$/;
Object.defineProperty( String.prototype, 'isEmpty',{
    configurable:false,
    enumerable:false,
    get:function isEmpty(){
        return String.isEmptyRegExp.test(this);
    }
});

String._dummyElement_ = document.createElement('div');
attach( String.prototype, 'toHtml', function removeHtmlTags(){
    String._dummyElement_.innerHTML = this.trim();
    return  String._dummyElement_.firstChild;
});

attach( String.prototype, 'format', function format(object){
    var property, exp, result = this;
    for(property in object){
        exp = new RegExp('\\{' + property + '\\}', 'g');
        result = result.replace(exp, object[property]);
    }
    return result;
});

String.camelCaseToSentenceExp = /([A-Za-z])(?=[^A-Za-z]+)|([^A-Za-z])(?=[A-Za-z]+)|([A-Za-z])(?=[A-Z])/g;
attach( String.prototype, 'camelCaseToSentence', function format(object){
    var result = this.replace(String.camelCaseToSentenceExp, "\$1\$2\$3 ");
    result = result.toLowerCase();
    result = result.trim();
    return result.substr(0,1).toUpperCase() + result.substr(1,result.length);
});







document.cloneTemplate = function cloneTemplate(selector){
    var template = document.querySelector(selector);
    if(!template){
        throw "Template " + selector + " not found.";
    }
    
    var clone = document.importNode(template.content, true);
    return clone;
};

document.appendTo = function appendTo(appendTo, element){
    var temp;
    if( typeof appendTo == "string"){
        temp = document.querySelector(appendTo);
        if(!temp){
            throw "Element " + appendTo + " not found.";
        }
        appendTo = temp;
    }
    if( appendTo ){
        appendTo.appendView(element);
    }
};







Node.prototype.traverseChildNodes = function traverseChildNodes(callBack){
    if(!this.childNodes)return;
    var
        childNodes = this.childNodes, index=0, length = this.childNodes.length,
        child
    ;
    for(;index<length;index++){
        child = childNodes[index];
        if( callBack(child) === false) return;
        child.traverseChildNodes(callBack);
    }
}

Node.prototype.traverseChildren = function traverseChildren(callBack){
    if(!this.children)return;
    var
        children = this.children, index=0, length = this.children.length,
        child
    ;
    for(;index<length;index++){
        child = children[index];
        if( callBack(child) === false) return;
        child.traverseChildren(callBack);
    }
};

Node.prototype.trickleEvent = function trickleEvent(event){
    function dispatchEvent(child){
        child.dispatchEvent(event);
    }
    this.traverseChildren(dispatchEvent);
};

Node.prototype._removeChild_ = Node.prototype.removeChild;
Node.prototype.removeChild = function removeChild(element){
    var event = new Event("beforedetached");
    element.dispatchEvent(event);
    
    event = new Event("beforeancestordetached");
    element.trickleEvent(event);

    this._removeChild_(element);

    event = new Event("ancestordetached");
    element.trickleEvent(event);

    event = new Event("detached");
    element.dispatchEvent(event);
    element = this.firstChild;
}

Node.prototype._appendChild_ = Node.prototype.appendChild;
Node.prototype.appendChild = function appendChild(element){

    var event = new Event("beforeattached");
    element.dispatchEvent(event);
    
    event = new Event("beforeancestorattached");
    element.trickleEvent(event);

    this._appendChild_(element);

    event = new Event("ancestorattached");
    element.trickleEvent(event);

    event = new Event("attached");
    element.dispatchEvent(event);
    element = this.firstChild;
};

Node.prototype.removeAllChilds = function removeAllChilds(){
    var element = this.firstChild;
    
    while (element) {
        this.removeChild(element);
        element = this.firstChild;
    }
};

Node.prototype.removeView = function removeView(element){
    if(!element) throw "Element can't be null";
    if(element.referenceToElements && element.referenceToElements.root){
        element = element.referenceToElements.root;
    }
    this.removeChild(element);
};

Node.prototype.replaceView = function(newChild, oldChild){
    if(!newChild) throw "New child can't be null";
    if(!oldChild) throw "Old child can't be null";

    if(newChild.referenceToElements && newChild.referenceToElements.root){
        newChild = newChild.referenceToElements.root;
    }

    if(oldChild.referenceToElements && oldChild.referenceToElements.root){
        oldChild = oldChild.referenceToElements.root;
    }

    this.replaceChild(newChild, oldChild);
}

Node.prototype.appendView = function appendView(element){
    if(!element) throw "Element can't be null";
    if(element.referenceToElements && element.referenceToElements.root){
        element = element.referenceToElements.root;
    }

    this.appendChild(element);
};

Node.prototype.appendAtTop = function(element){
    if(!element) throw "Element can't be null";
    if(element.referenceToElements && element.referenceToElements.root){
        element = element.referenceToElements.root;
    }

    if(!this.firstChild){
        this.appendChild(element);
    } else {
        this.insertBefore(element, this.firstChild);
    }
};

Node.prototype.setContent = function setContent(element){
    this.removeAllChilds();
    this.appendView(element);
};

Node.prototype.appendViewAfter = function appendViewAfter(element, referenceElement){
    if(!element) throw "Element can't be null";
    if(element.referenceToElements && element.referenceToElements.root){
        element = element.referenceToElements.root;
    }

    if(referenceElement.nextSibling){
        this.insertBefore(element, referenceElement.nextSibling);
    }else{
        this.appendChild(element);
    }
};








attach( Array.prototype, 'serialize', function serialize(){
    var index=0, length = this.length, value, data = [];
    for(;index<length;index++){
        value = this[index];
        if(value && value.serialize){
            value = value.serialize();
        }
        data[index] = value;
    }
    return data;
});

attach( Array.prototype, 'clear', function clear(){
    return this.splice(0, this.length);
});

attach( Array.prototype, 'remove', function remove(value) {
    var index = this.indexOf(value);
    if (index != -1) {
        return this.splice(index, 1);
    }
    return false;
});





Object.keyClone = function keyClone(object) {
    var
        clone = {},
        key
    ;

    for(key in object) {
        if(Array.isArray(object[key])){
            clone[key] = object[key];
        }else if( typeof(object[key]) == "object" && object[key] != null){
            clone[key] = Object.keyClone(object[key]);
        } else {
            clone[key] = object[key];
        }
    }

    return clone;
};

Object.toArray = function toArray(object){
    var
        length = object.length,
        index = 0, array
    ;
    if(typeof length != "number" || length < 0){
        return null;
    }
    array = [];
    for(;index<length;index++){
        array.push(object[index]);
    }
    return array;
};




