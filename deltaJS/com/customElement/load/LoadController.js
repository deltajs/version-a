
var prototype = Object.create(HTMLElement.prototype, {
    createdCallback : {
        value : function createdCallback() {
            var
                nameSpace           = this.getAttribute('name-space'),
                controllerClasss    = include(nameSpace),
                controller          = new controllerClasss()
            ;
            this.parentNode.replaceView(controller, this);
        }
    }
});

var LoadController = document.registerElement('load-controller', {
    prototype: prototype
});



