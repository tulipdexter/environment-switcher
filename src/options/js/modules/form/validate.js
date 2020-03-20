// Validate

const messages = {
    valueMissing: 'Required',
    typeMismatchUrl: 'Invalid Url'
};

const validate = {
    input: input => {
        const valueMissing = input.validity.valueMissing;
        const typeMismatch = input.validity.typeMismatch;

        if (valueMissing) {
            input.setCustomValidity(messages.valueMissing);
        } else if (typeMismatch) {
            if (input.type === 'url') {
                input.setCustomValidity(messages.typeMismatchUrl);
            }
        } else {
            input.setCustomValidity('');
        }
    },
    form: form => {
        form.checkValidity();
    }
};

export {validate};