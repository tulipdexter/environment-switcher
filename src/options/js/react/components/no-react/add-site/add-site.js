const formContent = `
    
`;

const addSite = () => {
    const button = document.querySelector('[data-add-site]');

    if (!button) return;

    button.addEventListener('click', () => {
        modal.init({
            title: bla,
            form: true,
            html: form,
            actions: []
        }); // TODO: Modal
    });
};

export {addSite};