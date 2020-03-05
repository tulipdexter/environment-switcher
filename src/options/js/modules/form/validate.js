// Validate

const messages = {
    required: 'Required',
    url: 'Invalid Url'
};

const validate = {
    input: input => {
        const valueMissing = input.validity.valueMissing;
        let valid = input.validity.valid;

        let message = '';

        if (valueMissing) {
            message = messages.required;
        } else {
            if (!valid) {
                switch (input.type) {
                    case 'url':
                        message = 'Invalid URL';
                        break;
                }
            }
        }

        return message;
    },
    form: form => {
        // TODO
    }
};

export {validate};