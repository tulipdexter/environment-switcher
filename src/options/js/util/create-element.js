const createElement = (name, options = {}) => {
    const {className, attributes} = options;
    const attributeEntries = attributes && Object.entries(attributes);

    const element = document.createElement(name);
    if (className) element.className = className;

    if (attributeEntries) {
        for (const [attribute, value] of attributeEntries) {
            element.setAttribute(attribute, value);
        }
    }

    return element;
};

export {createElement};