import {modal} from "./modal";
import {awaitElementRender} from "../util/await-element-render";
import {formField} from "./form";

// When you click edit, re-fetch the information
// from the storage but only get that site name.
// site: { name: bla, environments: [ { name: bla, url: bla }, { name: bla, url: bla }] }

// When you click add new, need to set up site structure in here somewhere.

const site = {
    name: null,
    environments: []
};

const addEnvironment = () => {
    site.environments = [...site.environments, { name: '', url: '' }];
};

const setupEnvironments = () => {
    const defaultEnvironmentCount = 2;

    for (let i = 0; i < defaultEnvironmentCount; i++) {
        addEnvironment();
    }
};

const createEnvironments = () => {
    return site.environments.map((env, index) => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'environment';

        const id = (index + 1).toString();

        const idElement = document.createElement('div');
        idElement.className = 'environment__id';
        idElement.textContent = id;

        const contentElement = document.createElement('div');
        contentElement.className = 'environment__content';

        const nameInputElement = formField('Name', 'input', 'env-name-' + id, {
            type: 'text',
            name: 'environmentName',
            required: true,
            customValidation: null
        });

        const urlInputElement = formField('Url', 'input', 'env-url-' + id,{
            type: 'text',
            name: 'url',
            required: true,
            customValidation: null
        });

        contentElement.appendChild(nameInputElement);
        contentElement.appendChild(urlInputElement);

        environmentElement.appendChild(idElement);
        environmentElement.appendChild(contentElement);

        return environmentElement;
    });
};

const modalForm = () => {
    const formElement = document.createElement('form');

    const siteNameFieldElement = formField('Site Name', 'input', 'site-name', {
        type: 'text',
        name: 'siteName',
        required: true,
        modifier: 'large',
        customValidation: null
    });

    siteNameFieldElement.classList.add('mb-5');

    const environmentsHeadingElement = document.createElement('h3');
    environmentsHeadingElement.textContent = 'Environments';

    formElement.appendChild(siteNameFieldElement);
    formElement.appendChild(environmentsHeadingElement);

    setupEnvironments();

    const environments = createEnvironments();
    environments.forEach(environment => formElement.appendChild(environment));

    return formElement;
};

export const newSite = () => {
    const button = document.querySelector('[data-new-site]');

    if (!button) return;

    button.addEventListener('click', () => {
        const newSiteModal = modal.create({
            content: modalForm()
        });

        awaitElementRender(newSiteModal)
            .then(() => modal.show(newSiteModal));
    });
};