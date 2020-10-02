const messages = {
    valueMissing: 'Required',
    typeMismatchUrl: 'Invalid Url'
};

const validate = element => {
    element.setCustomValidity('');

    const valueMissing = element.validity.valueMissing;
    const typeMismatch = element.validity.typeMismatch;

    if (valueMissing) {
        element.setCustomValidity(messages.valueMissing);
    }

    if (element.tagName === 'INPUT') {
        if (typeMismatch) {
            if (element.type === 'url') {
                element.setCustomValidity(messages.typeMismatchUrl);
            }
        }
    }

    return element.checkValidity();
};

export {validate};
