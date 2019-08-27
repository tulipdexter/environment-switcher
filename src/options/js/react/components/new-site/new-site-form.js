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
        this.validateEnvironment = this.validateEnvironment.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleAddEnvironment = this.handleAddEnvironment.bind(this);
        this.handleSiteName = this.handleSiteName.bind(this);
        this.handleEnvironment = this.handleEnvironment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.minEnvs = 2;

        this.state = {
            siteName: null,
            envs: [],
            formValidity: false
        };
    }

    createEnvironment() {
        this.setState({
            // No state mutation
            envs: [...this.state.envs, { name: '', url: '' }],
        });
    };

    /**
     * Validation
     */

    validateForm() {
        console.log(this.form);
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
                customValidity = 'Site exists';
                break;
            }
        }

        return customValidity;
    }

    validateEnvironment(value) {
        let customValidity = '';

        for (let i = 0; i < this.state.envs.length; i++) {
            if (this.state.envs[i].name === value) {
                customValidity = "Environment exists";
                break
            }
        }

        return customValidity;
    }

    handleSiteName(input) {
        const value = input.value;

        if (value !== this.state.siteName) {
            this.setState({
                siteName: value
            });

            this.validateForm();
        }
    }

    handleEnvironment(input, index) {
        const {name, value} = input;
        const envs = [...this.state.envs];

        envs[index] = {
            ...envs[index],
            [name]: value
        };

        this.setState({ envs });

        this.validateForm();
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

    componentDidMount() {
        // Setup initial envs - should not be in the constructor
        // Should be an init or setup function that is called somewhere higher?
        for (let i = 0; i < this.minEnvs; i++) {
            this.createEnvironment();
        }
    }

    render(props, {envs, submitErrors}) {
        // shouldValidate={this.state.something}
        // onValid=bla
        // Inside the form component, if shouldValidate is true, it will validate the form
        return (
            <Form onSubmit={this.handleSubmit} ref={form => this.form = form}>
                <div class="mb-3">
                    {/* Name of the site */}
                    <Input type={'text'}
                           label={'Site name'}
                           name={'siteName'}
                           customValidity={this.validateSiteName}
                           onChange={this.handleSiteName}
                           required />
                </div>
                <h3>Environments</h3>
                {envs.map((env, index) => {
                    // TODO: Dynamic ref
                    return (
                        <Environment id={index + 1} index={index}>
                            {/*The index needs to be sent to the input and back into the handler*/}
                            <Input type={'text'}
                                   label={'Name'}
                                   name={'name'}
                                   index={index}
                                   customValidity={this.validateEnvironment}
                                   onChange={(value) => this.handleEnvironment(value, index)}
                                   required />
                            <Input type={'url'}
                                   label={'Url'}
                                   name={'url'}
                                   index={index}
                                   customValidity={this.validateEnvironment}
                                   onChange={this.handleEnvironment}
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