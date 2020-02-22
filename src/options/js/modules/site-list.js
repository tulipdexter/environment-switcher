import {storage} from "../util/storage";

const createNoSitesHtml = () => {
    const element = document.createElement('div');
    element.className = 'no-sites';

    element.innerHTML = `
        <p class="no-sites__emoji">🙈</p>
        <p class="no-sites__message">Nothing to see here, you need to add your first site</p>
    `;

    return element;
};

export const getSiteList = () => {
    const targetContainerElement = document.querySelector('[data-sites]');

    if (!targetContainerElement) return;

    storage.get('sites')
        .then(data => {
            if (data.length) {
                console.log(data);
            } else {
                const noSitesHtml = createNoSitesHtml();
                targetContainerElement.appendChild(noSitesHtml);
            }
        });
};