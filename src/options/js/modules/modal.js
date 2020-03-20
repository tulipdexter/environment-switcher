import {customEvents} from "../util/custom-events";

const elements = {};

export const modal = {
    create: function(options) {
        if (!options.body) throw new Error('Modal options object must include body');

        elements.modal = document.createElement('div');
        elements.modal.className = 'modal';

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.close(elements.modal);
            }
        });

        // close button element
        const closeButtonElement = document.createElement('button');
        closeButtonElement.innerHTML = '&times;';
        closeButtonElement.className = 'modal__close';

        closeButtonElement.addEventListener('click', this.close);

        // content element
        const contentElement = document.createElement('div');
        contentElement.className = 'modal__container';

        contentElement.appendChild(options.body);

        // footer element
        if (options.actions && options.actions.length) {
            const footerElement = document.createElement('div');
            footerElement.className = 'modal__footer';

            options.actions.forEach(action => footerElement.appendChild(action));

            contentElement.appendChild(footerElement);
        }

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