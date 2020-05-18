import {autofocus} from "./autofocus";
import {customEvents} from "../util/custom-events";
import {createElement} from "../util/create-element";
import {FormField} from "./form/form-field";
import {icons} from "./icons";
import {modal} from "./modal";
import {awaitElementRender} from "../util";

// TODO
// This file will become 'site-editor'.
// It's init method will take an optional site object.
// inside that method it's siteState = site || { site: {bla bla}
// That means that the object here (elements and state) will need to change.
// So this may become a class so it can hold state.

const siteState = {};
const elements = {};

// Helpers

const _dispatchUpdateEnvironmentsEvent = element => {
    const updateEvent = new CustomEvent(customEvents.updateEnvs, {
        bubbles: true
    });

    element.dispatchEvent(updateEvent);
};

const _isRemovable = () => {
    return siteState.environments.length > 2;
};

const _addEnvironmentToState = () => {
    siteState.environments = [...siteState.environments, { name: '', url: '' }];
};

// Event Handlers

const _handleRemoveEnv = (index, button) => {
    siteState.environments.splice(index, 1); // Remove env from array
    _dispatchUpdateEnvironmentsEvent(button)
};

// pass the event to this (will then bind)
const _handleAddEnv = (button) => {
    _addEnvironmentToState();
    _dispatchUpdateEnvironmentsEvent(button)
};

const _handleSiteNameChange = (input) => {
    const value = input.value;

    if (value !== siteState.siteName) {
        siteState.siteName = value;
    }
};

// Might need to split the name at the dash url-
const _handleEnvironmentChange = (input, index) => {
    const {name, value} = input;
    const sanitisedName = name.split('-').pop().split('-')[0];
    const envs = [...siteState.environments];

    envs[index] = {
        ...envs[index],
        [sanitisedName]: value
    };

    siteState.environments = envs;
};

const createEnvironmentElement = (index, isRemovable) => {
    const id = (index + 1).toString();


    const environmentElement = createElement('div', { className: 'environment' });
    const formGroupElement = createElement('div', { className: 'form-group form-group--right-bias' });

    const nameFormField = new FormField('Name', 'input', 'env-' + id + '-name', {
        type: 'text',
        name: 'env-' + id + '-name',
        required: true,
        customValidation: null
    })
        .create();

    const urlInputElement = new FormField('Url', 'input', 'env-' + id + '-url',{
        type: 'url',
        name: 'env-' + id + '-url',
        required: true,
        customValidation: null
    })
        .create();

    nameFormField.input.addEventListener('change', event => _handleEnvironmentChange(event.target, index));
    urlInputElement.input.addEventListener('change', event => _handleEnvironmentChange(event.target, index));

    formGroupElement.appendChild(nameFormField.field);
    formGroupElement.appendChild(urlInputElement.field);

    environmentElement.appendChild(formGroupElement);

    if (isRemovable) {
        const removeEnvButton = createElement('button', {
            className: 'button button--danger button--link button--icon environment__remove'
        });
        removeEnvButton.type = 'button';
        removeEnvButton.className = 'button button--danger button--link button--icon environment__remove';
        removeEnvButton.innerHTML = `
            ${icons.remove(16, 16)}<span class="visually-hidden">Remove environment</span>
        `;

        removeEnvButton.addEventListener('click', (event) => _handleRemoveEnv(index, event.target));

        environmentElement.appendChild(removeEnvButton);
    }

    return environmentElement;
};

const createEnvironments = () => {
    const fragment = document.createDocumentFragment();

    const environments = siteState.environments.map((env, index) => {
        const environmentElement = createElement('div', { className: 'environment' });
        const environment = createEnvironmentElement(index, _isRemovable());

        environmentElement.appendChild(environment);

        return environmentElement;
    });

    environments.forEach(environment => fragment.appendChild(environment));

    return fragment;
};

const rerenderEnvironments = () => {
    elements.environmentsContainer.innerHTML = '';
    const environments = createEnvironments();
    elements.environmentsContainer.appendChild(environments);
};

const setupInitialEnvironments = () => {
    const defaultEnvironmentCount = 2;
    // This needs to happen here because it resets the site when
    // you click the add site button
    siteState.name = '';
    siteState.environments = [];

    for (let i = 0; i < defaultEnvironmentCount; i++) {
        _addEnvironmentToState();
    }
};

const createBaseForm = () => {
    elements.form = createElement('form');

    const siteNameFormField = new FormField('Site Name', 'input', 'site-name', {
        type: 'text',
        name: 'siteName',
        required: true,
        customValidation: null
    })
        .create();

    siteNameFormField.field.classList.add('mb-3');
    siteNameFormField.input.addEventListener('blur', event => _handleSiteNameChange(event.target));

    const environmentsHeadingElement = document.createElement('h3');
    environmentsHeadingElement.textContent = 'Environments';

    elements.form.appendChild(siteNameFormField.field);
    elements.form.appendChild(environmentsHeadingElement);
};

const _setupTemporaryEventListeners = () => {
    document.addEventListener(customEvents.updateEnvs, rerenderEnvironments);
};

const _removeTemporaryEventListeners = () => {
    document.removeEventListener(customEvents.updateEnvs, rerenderEnvironments);
};

const _handleSave = () => {
    const formValidity = elements.form.checkValidity();

    // modal.close();
};

const createModalActions = () => {
    const saveButton = document.createElement('button');
    saveButton.className = 'modal__action modal__action--advance';
    // saveButton.setAttribute('disabled', 'disabled');
    saveButton.addEventListener('click', _handleSave);
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
    const form = createElement('form');
    const modalBody = createElement('div', {className: 'modal__body'});

    const siteNameFormField = new FormField('Site Name', 'input', 'site-name', {
        type: 'text',
        name: 'siteName',
        required: true,
        customValidation: null
    })
        .create();

    siteNameFormField.field.classList.add('mb-3');
    siteNameFormField.input.addEventListener('blur', event => _handleSiteNameChange(event.target));

    const environmentsHeadingElement = document.createElement('h3');
    environmentsHeadingElement.textContent = 'Environments';

    setupInitialEnvironments();

    // TODO: handle this elements.* thing
    elements.environmentsContainer = createElement('div', {
        className: 'mb-2'
    });

    // Builds the environments first time
    const environments = createEnvironments();
    elements.environmentsContainer.appendChild(environments);
    modalBody.appendChild(elements.environmentsContainer);

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

    addEnvButton.addEventListener('click', e => _handleAddEnv(e.target));

    elements.addEnvironment = addEnvButton;

    modalBody.appendChild(elements.addEnvironment);

    const modalActions = createModalActions();

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

    _setupTemporaryEventListeners();
    document.addEventListener(customEvents.modalClose, _removeTemporaryEventListeners);

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
