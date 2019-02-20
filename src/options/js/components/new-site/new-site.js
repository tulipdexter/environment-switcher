import { h, render, Component } from 'preact';
import { FormField } from "../form/form-field";
import { Environment } from "./environment";
import './new-site.css';

export class NewSite extends Component {
    constructor(props) {
        super(props);

        // TODO
        this.state = {
            environments: 2
        }
    }

    // TODO
    componentDidMount() {
        // Think the env number stuff goes here
    }

    render() {
        return (
            <div>
                <form>
                    <fieldset class="mb-3">
                        <FormField label="Site name"  />
                    </fieldset>
                    <h3>Environments</h3>
                    <Environment />
                </form>
            </div>
        )
    }
}
