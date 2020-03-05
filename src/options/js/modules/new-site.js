import {autofocus} from "./autofocus";
import {customEvents} from "../util/custom-events";
import {FormField} from "./form/form";
import {icons} from "./icons";
import {modal} from "./modal";
import {awaitElementRender} from "../util";

// TODO
// This file will become 'site-editor'.
// It's init method will take an option site object.
// inside that method it's siteState = site || { site: {bla bla}

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
    console.log('handle environment', input, index);
    // validate.input(input);

    const {name, value} = input;
    const sanitisedName = name.split('-').pop().split('-')[0];
    const envs = [...siteState.environments];

    envs[index] = {
        ...envs[index],
        [sanitisedName]: value
    };

    siteState.environments = envs;
    // this.validateForm();
};

const createEnvironmentElement = (index, isRemovable) => {
    const id = (index + 1).toString();

    const environmentElement = document.createElement('div');
    environmentElement.className = 'environment';

    const formGroupElement = document.createElement('div');
    formGroupElement.className = 'form-group form-group--right-bias';

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
        const removeEnvButton = document.createElement('button');
        removeEnvButton.type = 'button';
        removeEnvButton.className = 'button button--danger button--small button--icon environment__remove';
        removeEnvButton.innerHTML = `
            ${icons.remove(10, 10)}<span class="visually-hidden">Remove environment</span>
        `;

        removeEnvButton.addEventListener('click', (event) => _handleRemoveEnv(index, event.target));

        environmentElement.appendChild(removeEnvButton);
    }

    return environmentElement;
};

const createEnvironments = () => {
    const fragment = document.createDocumentFragment();

    const environments = siteState.environments.map((env, index) => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'environment';
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
    elements.form = document.createElement('form');

    const siteNameFormField = new FormField('Site Name', 'input', 'site-name', {
        type: 'text',
        name: 'siteName',
        required: true,
        modifier: 'hero',
        customValidation: null
    })
        .create();

    siteNameFormField.field.classList.add('mb-5');
    siteNameFormField.input.addEventListener('blur', event => _handleSiteNameChange(event.target));

    const environmentsHeadingElement = document.createElement('h3');
    environmentsHeadingElement.textContent = 'Environments';

    elements.form.appendChild(siteNameFormField.field);
    elements.form.appendChild(environmentsHeadingElement);

    return elements.form;
};

const _setupTemporaryEventListeners = () => {
    document.addEventListener(customEvents.updateEnvs, () => rerenderEnvironments());
};

// This removal will happen on save or on cancel
// Modal close may need to take a callback somehow
// const _removeTemporaryEventListeners = () => {
//     document.removeEventListener(customEvents.updateEnvs, _handleUpdateEnvs);
// };

const createModalForm = () => {
    createBaseForm();
    setupInitialEnvironments();

    const environmentsContainer = document.createElement('div');
    environmentsContainer.className = 'mb-2';

    // Builds the environments first time
    elements.environmentsContainer = environmentsContainer;
    const environments = createEnvironments();
    elements.environmentsContainer.appendChild(environments);

    elements.form.appendChild(elements.environmentsContainer);

    const addEnvButton = document.createElement('button');
    addEnvButton.type = 'button';
    addEnvButton.className = 'button button--small button--icon';
    addEnvButton.innerHTML = `
        ${icons.add(10, 10)}
        Add environment
    `;

    addEnvButton.addEventListener('click', e => _handleAddEnv(e.target));

    elements.addEnvironment = addEnvButton;

    elements.form.appendChild(elements.addEnvironment);

    return elements.form;
};

const newSite = () => {
    const button = document.querySelector('[data-new-site]');
    if (!button) return;

    _setupTemporaryEventListeners();

    button.addEventListener('click', () => {
        const modalForm = createModalForm();

        const newSiteModal = modal.create({
            content: modalForm
        });

        awaitElementRender(newSiteModal)
            .then(() => {
                modal.show(newSiteModal);
                autofocus(modalForm);
            });
    });
};

export {newSite};