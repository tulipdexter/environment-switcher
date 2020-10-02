const Form = class {
    constructor(options) {
        this._options = options;
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(event) {
        event.preventDefault();
    };

    create() {
        const {className} = this._options;
        const formElement = document.createElement('form');
        formElement.setAttribute('novalidate', '');

        formElement.addEventListener('submit', this._handleSubmit);

        if (className) formElement.className = className;

        return formElement;
    }
};

export {Form};
