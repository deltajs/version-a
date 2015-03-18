
Step.super = "delta.com.ui.Ui"

function Step(params){
    Super(this,params);
}

Step.properties = {
    name            : null,
    index           : null,
    wizard          : null,
    isCurrentStep   : false,
    title           : null,
    controller      : null,
    action          : null,

    goTo : function goTo(){
        this.wizard.currentStep = this;
    }
}



