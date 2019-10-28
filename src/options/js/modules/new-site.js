import {modal} from "./modal";
import {awaitElementRender} from "../util/await-element-render";
import {formField} from "./form";
import {icons} from "./icons";

// When you click edit, re-fetch the information
// from the storage but only get that site name.
// site: { name: bla, environments: [ { name: bla, url: bla }, { name: bla, url: bla }] }

// When you click add new, need to set up site structure in here somewhere.

// When save, need to put something to storage.
// TODO: Before any updateEnvironments is called, make sure the value of the inputs is added
// to this object.
const site = {};

const events = {
    updateEnvs: 'update.envs'
};

const elements = {};

const addEnvironment = () => {
    site.environments = [...site.environments, { name: '', url: '' }];
};

const setupInitialEnvironments = () => {
    const defaultEnvironmentCount = 2;

    for (let i = 0; i < defaultEnvironmentCount; i++) {
        addEnvironment();
    }
};

const dispatchUpdateEnvironmentsEvent = element => {
    const updateEvent = new CustomEvent(events.updateEnvs, {
        detail: 'test',
        bubbles: true
    });

    element.dispatchEvent(updateEvent);
};

const createEnvironment = index => {
    const id = (index + 1).toString();
    const fragment = document.createDocumentFragment();

    // TODO: Could form field have an 'eventListeners' property?
    // eventListeners: { 'input': () => {}, 'blur': () => {} }
    // So then when you input in the input you can store the value here in sites
    const nameInputElement = formField('Name', 'input', 'env-' + id + '-name', {
        type: 'text',
        name: 'environmentName',
        required: true,
        customValidation: null
    });

    const urlInputElement = formField('Url', 'input', 'env-' + id + '-url',{
        type: 'text',
        name: 'url',
        required: true,
        customValidation: null
    });

    const createHeader = () => {
        const headerElement = document.createElement('header');
        headerElement.className = 'environment__header';

        const idElement = document.createElement('div');
        idElement.className = 'environment__id';
        idElement.textContent = id;

        headerElement.appendChild(idElement);

        // Only added envs can be removed
        if (id > 2) {
            const removeEnvElement = document.createElement('button');
            removeEnvElement.type = 'button';
            removeEnvElement.textContent = 'Remove';
            removeEnvElement.className = 'button button--link button--icon button--small environment__control';

            removeEnvElement.addEventListener('click', () => {
                site.environments.splice(index, 1);
                dispatchUpdateEnvironmentsEvent(removeEnvElement);
            });

            headerElement.appendChild(removeEnvElement);
        }

        return headerElement;
    };

    const headerElement = createHeader();

    fragment.appendChild(headerElement);
    fragment.appendChild(nameInputElement);
    fragment.appendChild(urlInputElement);

    return fragment;
};

const createEnvironments = () => {
    const fragment = document.createDocumentFragment();

    const environments = site.environments.map((env, index) => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'environment';

        const environment = createEnvironment(index);

        environmentElement.appendChild(environment);

        return environmentElement;
    });

    environments.forEach(environment => fragment.appendChild(environment));

    return fragment;
};

const createBaseForm = () => {
    elements.form = document.createElement('form');

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

    elements.form.appendChild(siteNameFieldElement);
    elements.form.appendChild(environmentsHeadingElement);

    return elements.form;
};

const _handleUpdateEnvs = () => {
    elements.environmentsContainer.innerHTML = '';
    const environments = createEnvironments();
    elements.environmentsContainer.appendChild(environments);
};

const _setupTemporaryEventListeners = () => {
    document.addEventListener(events.updateEnvs, _handleUpdateEnvs);
};

const _removeTemporaryEventListeners = () => {
    document.removeEventListener(events.updateEnvs, _handleUpdateEnvs);
};

const createModalForm = () => {
    createBaseForm();
    setupInitialEnvironments();

    elements.environmentsContainer = document.createElement('div');
    elements.form.appendChild(elements.environmentsContainer);

    const addEnvButton = document.createElement('button');
    addEnvButton.type = 'button';
    addEnvButton.className = 'button button--link button--icon';
    addEnvButton.innerHTML = `
        ${icons.add}
        Add environment
    `;

    addEnvButton.addEventListener('click', e => {
        addEnvironment();
        dispatchUpdateEnvironmentsEvent(e.target);
    });

    elements.addEnvironment = addEnvButton;

    elements.form.appendChild(elements.addEnvironment);

    return elements.form;
};

const newSite = () => {
    const button = document.querySelector('[data-new-site]');

    if (!button) return;

    _setupTemporaryEventListeners();

    button.addEventListener('click', () => {
        site.name = null;
        site.environments = [];

        const newSiteModal = modal.create({
            content: createModalForm()
        });

        awaitElementRender(newSiteModal)
            .then(() => {
                // This is here because it needs to be in the DOM before it dispatches event
                dispatchUpdateEnvironmentsEvent(newSiteModal);
                modal.show(newSiteModal)
            });
    });
};

export {newSite};