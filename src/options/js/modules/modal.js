import {customEvents} from "../util/custom-events";
import {createElement} from "../util";

const elements = {};

export const modal = {
    create: function(content) {
        if (!content) return;

        elements.modal = document.createElement('div');
        elements.modal.className = 'modal fade';

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.close(elements.modal);
            }
        });

        // close button element
        const closeButtonElement = createElement('button', {className: 'modal__close'});
        closeButtonElement.innerHTML = '&times;';
        closeButtonElement.addEventListener('click', this.close);

        // content element
        const contentElement = createElement('div', {className: 'modal__content'});

        contentElement.appendChild(closeButtonElement);
        contentElement.appendChild(content);

        // construct it
        elements.modal.appendChild(contentElement);

        document.body.appendChild(elements.modal);
        return elements.modal;
    },

    show: () => {
        elements.modal.classList.add('show');
        document.body.classList.add('has-modal');
    },

    close: () => {
        const closeEvent = new CustomEvent(customEvents.modalClose, {
            bubbles: true
        });

        elements.modal.classList.remove('show');
        elements.modal.addEventListener('transitionend', () => {
            elements.modal.parentNode.removeChild(elements.modal);
            document.body.classList.remove('has-modal');
        });

        elements.modal.dispatchEvent(closeEvent);
    }
};
