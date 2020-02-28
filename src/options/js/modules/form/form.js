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

const handleInputChange = input => {
    let validationElement;
    const validationMessage = validate.input(input);

    if (validationMessage.length) {
        if (!validationElement) {
            validationElement = document.createElement('span');
            validationElement.className = classNames.validation + ' ' + classNames.error;

            // parent node is undefined at this point :disappointed:
            validationElement.parentNode.appendChild(validationElement);
        }

        validationElement.textContent = validationMessage;
    }
};

const input = (type, name, id, required, customValidation) => {
    const input = document.createElement('input');

    input.type = type;
    input.name = name;
    input.id = id;
    input.required = required && 'required';

    input.className = classNames.input;

    input.addEventListener('change', event => handleInputChange(event.target));

    return input;
};

const formField = (label, elementName, id, options) => {
    const {type, name, required, modifier, customValidation} = options;

    const fieldElement = document.createElement('div');
    fieldElement.className = classNames.field;

    if (modifier) {
        fieldElement.classList.add('form-field--' + modifier);
    }

    const labelElement = document.createElement('label');
    labelElement.className = classNames.label;
    labelElement.textContent = label;
    labelElement.setAttribute('for', id);

    const inputElement = input(type, name, id, required, customValidation);

    inputElement.addEventListener('focus', () => {
        fieldElement.classList.add(classNames.focus);
    });

    inputElement.addEventListener('input', () => {
        if (inputElement.value) {
            fieldElement.classList.add(classNames.value);
        } else {
            fieldElement.classList.remove(classNames.value)
        }
    });

    inputElement.addEventListener('blur', () => {
        fieldElement.classList.remove(classNames.focus);
    });

    fieldElement.appendChild(labelElement);
    fieldElement.appendChild(inputElement);

    // Return an object so that the caller of `formField` can
    return {
        field: fieldElement,
        input: inputElement
    };
};

export {formField};