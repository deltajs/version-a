var rivets = include("delta.core.com.rivets");

template = {
    render : function render(selctor, model, appendTo){
        var
        	view = document.cloneTemplate(selctor),
        	temp, length = view.childNodes.length, index = 0
    	;

    	for(;index<length;index++){
    		if(view.childNodes[index] instanceof Text){
    			continue;
    		}
    		view = view.childNodes[index];
            break;
    	}

        rivets.bind(view, model);
        document.appendTo(appendTo, view);
        return view;
    }
}