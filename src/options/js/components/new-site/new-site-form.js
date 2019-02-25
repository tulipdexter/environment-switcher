import {h, render, Component} from 'preact';
import {FormField} from "../form/form-field";
import {EnvironmentList} from "./environment-list";
import {Button, variant} from "../button/button";
import './new-site.css';

export class NewSiteForm extends Component {
    constructor(props) {
        super(props);
        this.addEnv = this.addEnv.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.nextItemId = 0;

        this.state = {
            defaultEnvs: 2,
            envs: [],
            submitted: false
        };

        // Show two envs by default
        for (let i = 0; i < this.state.defaultEnvs; i++) {
            this.addEnv();
        }
    }

    // Initialize a counter that will increment
    // for each item ID
    makeItem() {
        // Create a new ID
        return {
            id: this.nextItemId++
        };
    }

    // No state mutation
    addEnv() {
        this.setState({
            envs: [...this.state.envs, this.makeItem()]
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted: true
        });

        // Do the chrome stuff here
        console.log(this.state);
    }

    // TODO: You are here
    createSite() {
        if (this.state.submitted) {

        }
    }

    // const createStore = form => {
    //     const siteNameField = form.querySelector('.form-field');
    //     const siteNameValue = siteNameField.querySelector('input').value;
    //     const sites = {};
    //
    //     sites[siteNameValue] = {
    //         "environments": collateEnvs(form)
    //     };
    //
    //     return sites;
    // };

    // TODO: You are here
    // TODO: SHOULD I USE STATE TO SWITCH A BOOLEAN THAT FORM IS SUBMITTED?
    render(props, {defaultEnvs, envs}) {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="mb-3">
                    <FormField labelText="Site name" inputType="text" />
                </div>
                <h3>Environments</h3>
                <EnvironmentList items={envs} />
                <div class="add-environment">
                    <Button variant={variant.link} onClick={this.addEnv} type="button">Add Environment</Button>
                </div>
                {props.children}
            </form>
        )
    }
}

// generic form component can handle the state of the form
//