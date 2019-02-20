import { h, render, Component } from 'preact';
import { FormField } from "../form/form-field";
import './environment.css';

export class Environment extends Component {
    render() {
        return (
            <fieldset class="environment">
                <h4 class="environment__number">{this.props.envNumber}</h4>
                <FormField label="Name" />
                <FormField label="Url" />
            </fieldset>
        );
    }
}