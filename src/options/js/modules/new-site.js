import {autofocus} from "./autofocus";
import {customEvents} from "../util/custom-events";
import {formField} from "./form";
import {icons} from "./icons";
import {modal} from "./modal";
import {awaitElementRender} from "../util";
import {rerender} from "preact";

// When you click edit, re-fetch the information
// from the storage but only get that site name.
// site: { name: bla, environments: [ { name: bla, url: bla }, { name: bla, url: bla }] }

// When you click add new, need to set up site structure in here somewhere.

// When save, need to put something to storage.
// TODO: Before any updateEnvironments is called, make sure the value of the inputs is added
// to this object.
const siteState = {
    name: '',
    environments: []
};

// Should ONLY rerender the whole environments list _if_ the number of items has reduced?
// when you click remove, you update the whole map.
// In that map, if the number of envs is more than 2 then all of them get the remove button.

const elements = {};
const defaultEnvironmentCount = 2;
let environmentIndex = defaultEnvironmentCount; // Sets a unique ID on each environment


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

const createEnvironmentElement = (index, isRemovable) => {
    const id = (index + 1).toString();

    const environmentElement = document.createElement('div');
    environmentElement.className = 'environment';

    const formGroupElement = document.createElement('div');
    formGroupElement.className = 'form-group form-group--right-bias';

    const nameFormField = formField('Name', 'input', 'env-' + id + '-name', {
        type: 'text',
        name: 'environmentName',
        required: true,
        customValidation: null
    });

    nameFormField.input.addEventListener('input', () => {
    });

    const urlInputElement = formField('Url', 'input', 'env-' + id + '-url',{
        type: 'text',
        name: 'url',
        required: true,
        customValidation: null
    });

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

    for (let i = 0; i < defaultEnvironmentCount; i++) {
        _addEnvironmentToState();
    }
};

const createBaseForm = () => {
    elements.form = document.createElement('form');

    const siteNameFormField = formField('Site Name', 'input', 'site-name', {
        type: 'text',
        name: 'siteName',
        required: true,
        modifier: 'hero',
        customValidation: null
    });

    siteNameFormField.field.classList.add('mb-5');

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