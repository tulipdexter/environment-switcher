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
        this.handleAddEnvironment = this.handleAddEnvironment.bind(this);
        this.handleValidSiteName = this.handleValidSiteName.bind(this);
        this.handleValidEnvironment = this.handleValidEnvironment.bind(this);
        this.setFormRef = this.setFormRef.bind(this);

        this.form = null;
        this.minEnvs = 2;

        this.state = {
            siteName: '',
            envs: [],
            formValid: false
        };

        // Setup initial envs
        for (let i = 0; i < this.minEnvs; i++) {
            this.createEnvironment();
        }
    }

    setFormRef(ref) {
        this.form = ref;
    }

    createEnvironment() {
        this.setState({
            // No state mutation
            envs: [...this.state.envs, { name: '', url: '' }],
        });
    };

    validateForm() {
        console.log('validate form');
        console.log(this.form);
        const validity = this.form.checkValidity();
        console.log(validity);
        console.log(this.state.formValid);
        if (validity !== this.state.formValid) {
            this.setState({
                formValid: validity
            }, () => {
                this.props.onValidityChange();
            });
        }
    }

    handleValidSiteName(element) {
        const {value} = element;

        if (value !== this.state.siteName) {
            this.setState({
                siteName: value
            })
        }

        this.validateForm();
    }

    handleValidEnvironment(element, idx) {
        const {name, value} = element;
        const envs = [...this.state.envs];

        envs[idx] = {
            ...envs[idx],
            [name]: value
        };

        this.setState({ envs });

        this.validateForm();
    }

    handleAddEnvironment() {
        console.log('handle add');
        if (this.state.formValid) {
            this.setState({
                formValid: false
            }, () => {
                this.props.onValidityChange();
                this.createEnvironment();
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handle submit', e.target);
    }

    render(props, {envs}) {
        return (
            <Form onSubmit={this.handleSubmit} setFormRef={this.setFormRef}>
                <div class="mb-3">
                    {/* Name of the site */}
                    <Input type={'text'}
                           title={'Site name'}
                           name={'siteName'}
                           value={this.state['siteName']}
                           onValid={this.handleValidSiteName}
                           required />
                </div>
                <h3>Environments</h3>
                {envs.map((env, index) => {
                    const envNumber = index + 1;
                    return (
                        <Environment key={index} index={index} env={envNumber} onValid={this.handleValidEnvironment} />
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