/**
 * what if form was a class
 * new Form
 * Then that would do something like
 * addEventListener for custom event that is fired whenever an input's validity state changes
 * you could pass a callback option that is called (with the this value?) when
 */

const Form = class {
    constructor(options) {
        this._options = options;
    }

    create() {
        const {className} = this._options;
        const formElement = document.createElement('form');

        if (className) formElement.className = className;

        // TODO: you are here
        // Problem in modal, the footer should be inside the form.
        // The button needs to submit the form to whatever the action of the form is
        // The callback will have to prevent default on the form (submit).
        //
    }
};

export {Form};