import {autofocus} from "./autofocus";
import {awaitElementRender, createElement, storage} from "../util";
import {Form} from "./form/form";
import {FormField} from "./form/form-field";
import {icons} from "./icons";
import {modal} from "./modal";

// TODO
// This file will become 'site-editor'.
// It's init method will take an optional site object.
// inside that method it's siteState = site || { site: {bla bla}
// That means that the object here (elements and state) will need to change.
// So this may become a class so it can hold state.

const siteState = {};
let envCount = 0;
let environmentHeight;

// Helpers

const _addEnvironmentToState = () => {
    siteState.environments = [
        ...siteState.environments,
        {
            name: '',
            url: ''
        }
    ];
};

// Event Handlers

const _handleRemoveEnv = (id, environmentElement) => {
    siteState.environments.splice(id, 1); // Remove env from array
    environmentElement.classList.remove('show');
    environmentElement.ontransitionend = () => environmentElement.remove();
    // _dispatchUpdateEnvironmentsEvent(button)
};

const _handleSiteNameChange = (input) => {
    const value = input.value;

    if (value !== siteState.name) {
        siteState.name = value;
    }
};

const _handleEnvironmentChange = (input, id) => {
    const {name, value} = input;
    const sanitisedName = name.split('-').pop().split('-')[0];
    const envs = [...siteState.environments];

    const envIndex = id - 1;

    envs[envIndex] = {
        ...envs[envIndex],
        [sanitisedName]: value
    };

    siteState.environments = envs;
};

const createEnvironment = () => {
    _addEnvironmentToState();

    const isRemovable = siteState.environments.length > 2;
    envCount++;

    return createEnvironmentElement(envCount, isRemovable);
};

const createEnvironmentElement = (id, isRemovable) => {
    const stringId = id.toString();
    const environmentElement = createElement('div', { className: 'environment' });
    const formGroupElement = createElement('div', { className: 'form-group form-group--right-bias' });

    const nameFormField = new FormField('Env Name', 'input', 'env-' + stringId + '-name', {
        type: 'text',
        name: 'env-' + stringId + '-name',
        required: true,
        customValidation: null
    })
        .create();

    const urlInputElement = new FormField('Url', 'input', 'env-' + stringId + '-url',{
        type: 'url',
        name: 'env-' + stringId + '-url',
        required: true,
        customValidation: null
    })
        .create();

    nameFormField.input.addEventListener('change', event => _handleEnvironmentChange(event.target, id));
    urlInputElement.input.addEventListener('change', event => _handleEnvironmentChange(event.target, id));

    formGroupElement.appendChild(nameFormField.field);
    formGroupElement.appendChild(urlInputElement.field);

    environmentElement.appendChild(formGroupElement);

    if (isRemovable) {
        const removeEnvButton = createElement('button', {
            className: 'button button--danger button--link button--icon environment__remove'
        });
        removeEnvButton.type = 'button';
        removeEnvButton.className = 'button button--danger button--link environment__remove';
        removeEnvButton.innerHTML = `
            ${icons.cross(10, 10)}<span class="visually-hidden">Remove environment</span>
        `;

        removeEnvButton.addEventListener('click', () => _handleRemoveEnv(id, environmentElement));

        environmentElement.appendChild(removeEnvButton);
    }

    return environmentElement;
};

const setupDefaultEnvironments = () => {
    const defaultEnvironmentCount = 2;
    let defaultEnvironments = [];

    // This needs to happen here because it resets the site when
    // you click the add site button
    envCount = 0;
    siteState.name = '';
    siteState.environments = [];

    for (let i=0; i<defaultEnvironmentCount; i++) {
        defaultEnvironments.push(createEnvironment(envCount, false));
    }

    return defaultEnvironments;
};

const _handleSave = async form => {
    if (form.checkValidity()) {
        // If storage has ownProperty sitename to lower case, send a warning message.

        const storedSites = await storage.get('sites');
        const sites = storedSites['sites'] || {};

        if (sites.length) {
            if (sites.hasOwnProperty(siteState.name)) console.log('exists');
            // This is where form needs to be customValidated to set the
        } else {
            const updatedSites = Object.assign(sites, {
                [siteState.name]: {
                    'environments': siteState.environments
                }
            });

            // YOU ARE HERE
            await storage.set({'sites': updatedSites});
            modal.close();
        }
    }
};

const createModalActions = form => {
    const saveButton = document.createElement('button');
    saveButton.className = 'modal__action modal__action--advance';
    // saveButton.setAttribute('disabled', 'disabled');
    saveButton.addEventListener('click', () => _handleSave(form));
    saveButton.innerHTML = `
        Save
        ${icons.arrowRight()}
    `;

    const cancelButton = document.createElement('button');
    cancelButton.className = 'modal__action modal__action--muted';
    cancelButton.addEventListener('click', modal.close);
    cancelButton.innerHTML = `
        ${icons.arrowLeft()}
        Cancel
    `;

    const modalActions = createElement('div', {
        className: 'modal__actions'
    });

    [cancelButton, saveButton].forEach(button => modalActions.append(button));

    return modalActions;
};

const createModalForm = () => {
    const form = new Form({
        className: 'my-form'
    })
        .create();

    const modalBody = createElement('div', {className: 'modal__body'});

    const siteNameFormField = new FormField('Site Name', 'input', 'site-name', {
        type: 'text',
        name: 'siteName',
        required: true
    })
        .create();

    siteNameFormField.field.classList.add('mb-3');
    siteNameFormField.input.addEventListener('blur', event => _handleSiteNameChange(event.target));

    const environmentsHeadingElement = document.createElement('h3');
    environmentsHeadingElement.textContent = 'Environments';

    const environmentsContainer = createElement('div', {
        className: 'mb-2'
    });

    const defaultEnvironments = setupDefaultEnvironments();
    defaultEnvironments.forEach(environment => environmentsContainer.append(environment));

    modalBody.append(siteNameFormField.field);
    modalBody.append(environmentsContainer);

    const addEnvButton = createElement('button', {
        className: 'button button--small button--icon button--link',
        attributes: {
            type: 'button'
        }
    });

    addEnvButton.innerHTML = `
        ${icons.add(10, 10)}
        Add environment
    `;

    addEnvButton.addEventListener('click', () => {
        const newEnvironment = createEnvironment();
        newEnvironment.classList.add('fade', 'scale');

        environmentsContainer.appendChild(newEnvironment);

        awaitElementRender(newEnvironment)
            .then(() => {
                newEnvironment.classList.add('show');
            });
    });

    modalBody.appendChild(addEnvButton);

    const modalActions = createModalActions(form);

    form.appendChild(modalBody);
    form.appendChild(modalActions);

    return form;
};

const createModalContent = () => {
    const fragment = document.createDocumentFragment();
    const modalTitle = createElement('h2', {className: 'modal__title'});
    modalTitle.textContent = 'Create a new site';

    const form = createModalForm();
    fragment.append(modalTitle);
    fragment.append(form);

    return fragment;
};

const newSite = () => {
    const button = document.querySelector('[data-new-site]');
    if (!button) return;


    button.addEventListener('click', () => {
        const modalContent = createModalContent();
        const newSiteModal = modal.create(modalContent);

        awaitElementRender(newSiteModal)
            .then(() => {
                modal.show(newSiteModal);
                autofocus(modalContent);
            });
    });
};

export {newSite};
