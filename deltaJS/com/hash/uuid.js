

var uuid = {
    used : {},
    get : function get(){
        id = this.build();
        if(used[id]){
            return this.get()
        }
        used[id] = true;
        return id;
    },

    build : function build() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var 
                d = new Date().getTime(),
                r = (d + Math.random()*16)%16 | 0
            ;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
    }
};




