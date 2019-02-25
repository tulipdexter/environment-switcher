import {h} from 'preact';
import {FormField} from "../form/form-field";
import './environment.css';

export const Environment = props => {
    // TODO: Add constructor and make required (prop types)
    return (
        <fieldset>
            <div class="environment">
                <h4 class="environment__number">{props.id}</h4>
                <div class="environment__fields">
                    <FormField
                        labelText="Name"
                        inputType="text"
                        inputName="envName" />
                    <FormField
                        labelText="Url"
                        inputType="text"
                        inputName="envUrl" />
                </div>
            </div>
        </fieldset>
    );
};