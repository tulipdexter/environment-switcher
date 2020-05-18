import {customEvents} from "../util/custom-events";
import {createElement} from "../util";

const elements = {};

export const modal = {
    create: function(options) {
        if (!options.title || !options.body) throw new Error('Modal options object must include title and body');

        elements.modal = document.createElement('div');
        elements.modal.className = 'modal';

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.close(elements.modal);
            }
        });

        // content element
        const contentElement = createElement('div', {
            className: 'modal__content'
        });

        // title element
        const titleElement = createElement('h2', {
            className: 'modal__title'
        });
        titleElement.textContent = options.title;

        // close button element
        const closeButtonElement = createElement('button', {
            className: 'modal__close'
        });
        closeButtonElement.innerHTML = '&times;';
        closeButtonElement.addEventListener('click', this.close);

        // body element
        const bodyElement = createElement('div', {
            className: 'modal__body'
        });
        bodyElement.appendChild(options.body);

        const modalActions = createElement('div', {className: 'modal__actions'});
        options.actions.forEach(action => modalActions.appendChild(action));

        contentElement.appendChild(titleElement);
        contentElement.appendChild(bodyElement);
        contentElement.appendChild(modalActions);

        elements.modal.appendChild(closeButtonElement);
        elements.modal.appendChild(contentElement);

        document.body.appendChild(elements.modal);
        return elements.modal;
    },

    show: () => {
        elements.modal.classList.add('show');
    },

    close: () => {
        const closeEvent = new CustomEvent(customEvents.modalClose, {
            bubbles: true
        });

        elements.modal.classList.remove('show');
        elements.modal.addEventListener('transitionend', () => {
            elements.modal.parentNode.removeChild(elements.modal);
        });

        elements.modal.dispatchEvent(closeEvent);
    }
};
