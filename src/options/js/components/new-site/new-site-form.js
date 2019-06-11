import {h, render, Component} from 'preact';
import {Button, variant} from "../button/button";
import {Form} from "../form/form";
import {Input} from "../form/input";
import {Environment} from "./environment";
import './new-site.css';

export class NewSiteForm extends Component {
    constructor(props) {
        super(props);
        this.createEnvironment = this.createEnvironment.bind(this);
        this.validateSiteName = this.validateSiteName.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleAddEnvironment = this.handleAddEnvironment.bind(this);
        this.handleSiteName = this.handleSiteName.bind(this);
        this.handleEnvironment = this.handleEnvironment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.form = null;
        this.minEnvs = 2;

        this.state = {
            siteName: null,
            envs: [],
            formValidity: false
        };

        // Setup initial envs - should not be in the constructor
        // Should be an init or setup function that is called somewhere higher?
        for (let i = 0; i < this.minEnvs; i++) {
            this.createEnvironment();
        }
    }

    createEnvironment() {
        this.setState({
            // No state mutation
            envs: [...this.state.envs, { name: '', url: '' }],
        });
    };

    validateForm() {
        const validity = this.form.checkValidity();

        if (validity !== this.state.formValidity) {
            this.setState({
                formValidity: validity
            }, () => {
                if (validity) {
                    this.props.onValid();
                } else {
                    this.props.onInvalid();
                }
            });
        }
    }

    validateSiteName(value) {
        let customValidity = '';
        for (const site of this.props.sites) {
            if (site.siteName === value) {
                customValidity = 'Silly sausage, sitename already exists';
                break;
            }
        }

        return customValidity;
    }

    handleSiteName(element) {
        const {value} = element;

        if (value !== this.state.siteName) {
            this.setState({
                siteName: value
            });

            this.validateForm();
        }
    }

    handleEnvironment(input, idx) {
        console.log(input, idx);
        const {name, value} = input;
        const envs = [...this.state.envs];

        envs[idx] = {
            ...envs[idx],
            [name]: value
        };

        this.setState({ envs });
    }

    handleAddEnvironment() {
        if (this.state.formValidity) {
            this.setState({
                formValidity: false
            }, () => {
                this.props.onInvalid();
                this.createEnvironment();
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateSiteName();

        const site = {
            siteName: this.state.siteName,
            envs: this.state.envs
        };

        this.props.handleSave(site);
    }

    validateEnvironment() {
        // TODO: Will check that environment of same name or with same url doesn't already exist
    }

    // Each input has an optional custom validation
    // If html5 validation all passes && customValidation passes
    // If that is all truthy, and if the validity is different to previous,
    // call the notify validity change

    render(props, {envs, submitErrors}) {
        return (
            <Form onSubmit={this.handleSubmit} ref={form => this.form = form}>
                <div class="mb-3">
                    {/* Name of the site */}
                    <Input type={'text'}
                           label={'Site name'}
                           name={'siteName'}
                           customValidity={this.validateSiteName}
                           // onValid={this.handleSiteName}
                           onValidityChange={this.validateForm}
                           required />
                </div>
                <h3>Environments</h3>
                {envs.map((env, index) => {
                    return (
                        <Environment id={index + 1}>
                            <Input type={'text'}
                                   label={'Name'}
                                   name={'name'}
                                   customValidity={this.validateEnvironment}
                                   // onValid={input => this.handleEnvironment(input, index)}
                                   onValidityChange={this.validateForm}
                                   required />
                            <Input type={'url'}
                                   label={'Url'}
                                   name={'url'}
                                   customValidity={this.validateEnvironment}
                                   // onValid={input => this.handleEnvironment(input, index)}
                                   onValidityChange={this.validateForm}
                                   required />
                        </Environment>
                    )
                })}
                <div class="add-environment">
                    <Button variant={variant.link} onClick={this.handleAddEnvironment} type="button">Add Environment</Button>
                </div>

                {this.props.children}
            </Form>
        )
    }
}