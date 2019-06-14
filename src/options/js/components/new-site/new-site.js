import {h, render, Component} from 'preact';
import {Button, variant} from "../button/button";
import {Environment} from "./environment";
import {Form} from "../form/form";
import {Input} from "../form/input";
import {Modal} from "../modal/modal";

import './new-site.css';

// Might be dumb
class NewSite extends Component {
    constructor(props) {
        super(props);

        this.minEnvs = 2;

        this.state = {
            siteName: null,
            envs: [],
            disableSave: true
        };
    }

    createEnvironment() {
        this.setState({
            // No state mutation
            envs: [...this.state.envs, { name: '', url: '' }],
        });
    };

    handleSiteNameChange(input, validateForm) {
        const {value} = input;

        if (value !== this.state.siteName) {
            this.setState({
                siteName: value
            });

            // TODO: Candidate for abstraction into own function
            const formValidity = validateForm();
            if (formValidity) this.setState({
                disableSave: false
            });
        }
    }

    handleEnvironmentChange(input, index, validateForm) {
        const {name, value} = input;
        const envs = [...this.state.envs];

        this.setState({
            [envs[index]]: {
                ...envs[index],
                [name]: value
            }
        });

        // TODO: Candidate for abstraction into own function
        const formValidity = validateForm();
        if (formValidity) this.setState({
            disableSave: false
        });
    }

    handleAddEnvironment() {
        this.createEnvironment();
        // if (this.state.formValid) {
        //     this.setState({
        //         formValid: false
        //     }, () => {
        //         this.props.onInvalid();
        //     });
        // }
    }

    setUpInitialEnvironments() {
        for (let i = 0; i < this.minEnvs; i++) {
            this.createEnvironment();
        }
    }

    componentDidMount() {
        this.setUpInitialEnvironments();
    }

    // Every time and input changes to valid
    // You need to validate the form
    // If input changes and becomes invalid, you can set form validity to invalid

    // TODO: Document why render props are being used

    render(props, {envs, disableSave}, context) {
        return (
            <Modal
                onClose={() => props.onCancel()}
                render={({close}) => {
                    return (
                        <div className="modal__backdrop">
                            <div className="modal__dialog">
                                <h4 className="modal__header">Add New Site</h4>
                                <Form
                                    render={({validateForm}) => {
                                        return (
                                            <div>
                                                <div className="mb-3">
                                                    <Input
                                                        type={'text'}
                                                        label={'Site name'}
                                                        name={'siteName'}
                                                        customValidity={this.validateSiteName}
                                                        onChange={input => this.handleSiteNameChange(input, validateForm)}
                                                        required/>
                                                </div>
                                                <h3>Environments</h3>
                                                {envs.map((env, index) => (
                                                    <Environment id={index + 1}>
                                                        <Input
                                                            type={'text'}
                                                            label={'Name'}
                                                            name={'name'}
                                                            customValidity={this.validateEnvironment}
                                                            onChange={input => this.handleEnvironmentChange(input, index, validateForm)}
                                                            required/>
                                                        <Input
                                                            type={'url'}
                                                            label={'Url'}
                                                            name={'url'}
                                                            customValidity={this.validateEnvironment}
                                                            onChange={input => this.handleEnvironmentChange(input, index, validateForm)}
                                                            required/>
                                                    </Environment>
                                                ))}
                                                <div className="add-environment">
                                                    <Button variant={variant.link} onClick={this.handleAddEnvironment.bind(this)}
                                                            type="button">Add Environment</Button>
                                                </div>
                                                <div className="modal__footer">
                                                    <Button onClick={() => close()}>Cancel</Button>
                                                    <Button variant={variant.primary} type={'submit'} disabled={disableSave}>Save</Button>
                                                </div>
                                            </div>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    )
                }}
            />
        )
    }
}

export {NewSite};