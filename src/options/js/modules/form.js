const classNames = {
    field: 'form-field',
    label: 'form-field__label',
    input: 'form-field__input',
    focus: 'focus',
    value: 'value'
};

const input = (type, name, id, required, customValidation) => {
    const input = document.createElement('input');

    input.type = type;
    input.name = name;
    input.id = id;
    input.required = required && 'required';

    input.className = classNames.input;

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