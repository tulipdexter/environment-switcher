import {awaitElementRender} from "../util/await-element-render";

export const modal = {
    create: function() {
        const modalElement = document.createElement('div');
        modalElement.className = 'modal';

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.remove(modalElement);
            }
        });

        const backdropElement = document.createElement('div');
        backdropElement.className = 'modal__backdrop';

        backdropElement.addEventListener('click', () => this.remove(modalElement));

        modalElement.appendChild(backdropElement);

        // modalElement.innerHTML = `
        //     <div class="modal__content">
        //         <header class="modal__header">${title}</header>
        //     </div>
        // `;

        // TODO: create close button with event listener
        // TODO: add event listener to escape key

        document.body.appendChild(modalElement);

        awaitElementRender(modalElement)
            .then(() => modalElement.classList.add('show'));
    },

    remove: modal => {
        // this should remove the show class first,
        // wait for the transition to end, then remove the element
        modal.classList.remove('show');
        modal.addEventListener('transitionend', () => {
            modal.parentNode.removeChild(modal);
        });
    }
};