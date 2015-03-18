
var
    Step = include("delta.com.ui.wizard.Step"),
    ArrayList = include("delta.com.dataStructure.collection.ArrayList")
;

Wizard.super = "delta.com.ui.Ui";

function Wizard(params){
    Super(this, params);
}

Wizard.properties = {
    _currentStep_   : false,
    state           : "onFirstStep",
    index           : 0,

    stepsByName : {
        type : Object
    },

    steps : {
        type : ArrayList,
        params : {
            defaultItemType : Step
        }
    },

    currentStep : {
        set : function setCurrentStep(value){
            value.isCurrentStep = true;
            this._currentStep_ && (this._currentStep_.isCurrentStep = false);
            this._currentStep_ = value;
            this.referenceToElements.stepHolder.setContent( value.controller );
            this.index = value.index;
        },
        get : function getCurrentStep(){
            return this._currentStep_;
        }
    },

    nextStep : {
        get : function getNextStep(){
            return this.steps[this.index + 1];
        }
    },

    start : function start(){
        this.index = 0;
        this.currentStep = this.steps[0];
    },

    addSteps : function addSteps(steps){
        var
            index = 0,
            length = steps.length,
            step
        ;
        for(;index<length;index++){
            step = steps[index];
            step.wizard = this;
            step.index = index;
            step = this.steps.push(step);
            this.stepsByName[step.name] = step;
        }
    },

    goToPreviousStep : function goToPreviousStep(){
        if((--this.index) == 0){
            this.state = "onFirstStep";
        }else{
            this.state = "onStep" + this.index;
        }

        this.currentStep = this.steps[this.index];
    },

    goToNextStept : function goToNextStept(){
        var action = this.currentStep.action;
        if(action){
            if(typeof action == "string" && this[action]){
                action = this[action];
                action.call(this);
            }else{
                action();
            }
        }

        if((++this.index) == this.steps.length - 1){
            this.state = "onLastStep";
        }else{
            this.state = "onStep" + this.index;
        }
        this.currentStep = this.steps[this.index];
    }
};





