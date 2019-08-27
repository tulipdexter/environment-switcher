import {modal} from "./modal";

export const newSite = () => {
    const button = document.querySelector('[data-new-site]');

    if (!button) return;

    button.addEventListener('click', () => {
        modal.create('New Site');
    });
};