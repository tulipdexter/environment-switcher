import {validate} from "./validate";

const classNames = {
    field: 'form-field',
    label: 'form-field__label',
    input: 'form-field__input',
    validation: 'form-field__validation',
    focus: 'focus',
    value: 'value',
    error: 'error'
};

const FormField = class {
    constructor(label, tagName, id, options) {
        this._label = label;
        this._tagName = tagName;
        this._id = id;
        this._options = options;

        this._formFieldElement = null;
        this._validationElement = null;
    }

    _handleInputChange(input) {
        const validationMessage = validate.input(input);

        if (validationMessage.length) {
            if (!this._validationElement) {
                this._validationElement = this._createValidationElement();
            }

            this._validationElement.textContent = validationMessage;
            this._formFieldElement.append(this._validationElement);
        }
    }

    _createValidationElement() {
        const validationElement = document.createElement('span');
        validationElement.className = classNames.validation + ' ' + classNames.error;

        return validationElement;
    }

    _createFormFieldElement(modifier) {
        const fieldElement = document.createElement('div');
        let className = classNames.field;

        if (modifier) className += (' ' + classNames.field + '--' + modifier);

        fieldElement.className = className;

        return fieldElement;
    }

    _createLabelElement(label, id) {
        const labelElement = document.createElement('label');
        labelElement.className = classNames.label;
        labelElement.textContent = label;
        labelElement.setAttribute('for', id);

        return labelElement;
    }

    _createInputElement(type, name, id, required, customValidation) {
        const inputElement = document.createElement(this._tagName);

        inputElement.type = type;
        inputElement.name = name;
        inputElement.id = id;
        inputElement.required = required && 'required';

        inputElement.className = classNames.input;

        inputElement.addEventListener('change', event => this._handleInputChange(event.target));
        inputElement.addEventListener('focus', () => this._formFieldElement.classList.add(classNames.focus));
        inputElement.addEventListener('blur', () => this._formFieldElement.classList.remove(classNames.focus));

        return inputElement;
    }

    create() {
        const {type, name, required, modifier, customValidation} = this._options;

        const formFieldElement = this._createFormFieldElement(modifier);
        const labelElement = this._createLabelElement(this._label, this._id);
        const inputElement = this._createInputElement(type, name, this._id, required, customValidation);

        formFieldElement.appendChild(labelElement);
        formFieldElement.appendChild(inputElement);

        this._formFieldElement = formFieldElement;

        return {
            field: formFieldElement,
            input: inputElement
        }
    }
};

export {FormField};