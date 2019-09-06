export const modal = {
    create: function(options) {
        // modal element
        const modalElement = document.createElement('div');
        modalElement.className = 'modal';

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.remove(modalElement);
            }
        });

        // backdrop element
        const backdropElement = document.createElement('div');
        backdropElement.className = 'modal__backdrop';

        // close button element
        const closeButtonElement = document.createElement('button');
        closeButtonElement.innerHTML = '&times;';
        closeButtonElement.className = 'modal__close';

        closeButtonElement.addEventListener('click', () => this.remove(modalElement));

        // content element
        const contentElement = document.createElement('div');
        contentElement.className = 'modal__content';

        contentElement.appendChild(options.content);

        modalElement.appendChild(backdropElement);
        modalElement.appendChild(closeButtonElement);
        modalElement.appendChild(contentElement);

        document.body.appendChild(modalElement);
        return modalElement;
    },

    show: modal => {
        modal.classList.add('show');
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