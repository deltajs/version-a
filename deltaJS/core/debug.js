debug = {
    getStack : function getStack(){
        var
            e = new Error(''),
            stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n')
        ;
        
        stack.shift();
        stack.shift();

        return stack;
    },

    logStack : function printStack(){
        var stack = this.getStack();
        console.log(stack.join('\n'));
    }
};



