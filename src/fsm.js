class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.activeState = config.initial;
        this.states = config.states;
        this.transitionHistory = [];
        this.undoHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.transitionHistory.push(this.activeState);
        this.activeState = state;
        this.undoHistory = [];
        if(!this.states[state]){
            throw new Error("state isnt exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.states[this.activeState].transitions[event]){
            this.changeState(this.states[this.activeState].transitions[event]);
        } else {
            throw new Error("state isnt exist");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event){
            return Object.keys(this.states);
        }
        var array = [];
        if(this.states.normal.transitions[event]){
            array.push('normal');
        }
        if(this.states.busy.transitions[event]){
            array.push('busy');
        }
        if(this.states.hungry.transitions[event]){
            array.push('hungry');
        }
        if(this.states.sleeping.transitions[event]){
            array.push('sleeping');
        }
        return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.transitionHistory.length > 0) {
            this.undoHistory.push(this.activeState);
            this.activeState = this.transitionHistory[this.transitionHistory.length-1];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.undoHistory.length > 0) {
            this.transitionHistory.push(this.activeState);
            this.activeState = this.undoHistory[this.undoHistory.length-1];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.transitionHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
