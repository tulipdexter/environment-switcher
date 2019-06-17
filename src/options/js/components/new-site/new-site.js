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
            disableSave: true,
            disableAddEnv: true
        };
    }

    createEnvironment() {
        this.setState({
            // No state mutation
            envs: [...this.state.envs, { name: '', url: '' }],
        });
    };

    handleSave(e) {
        // e.preventDefault(); THIS CAUSING MODAL TO NOT CLOSE

        const site = {
            siteName: this.state.siteName,
            envs: this.state.envs
        };

        this.props.handleSave(site);
    }

    handleSiteNameChange(input, validateForm) {
        const {value} = input;

        if (value !== this.state.siteName) {
            this.setState({
                siteName: value
            });

            const formValidity = validateForm();
            this.setState({
                disableSave: !formValidity,
                disableAddEnv: !formValidity
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

        const formValidity = validateForm();
        this.setState({
            disableSave: !formValidity,
            disableAddEnv: !formValidity
        });
    }

    handleAddEnvironment() {
        this.createEnvironment();
        if (!this.state.disableSave) {
            this.setState({
                disableSave: true,
                disableAddEnv: true
            });
        }
    }

    setUpInitialEnvironments() {
        for (let i = 0; i < this.minEnvs; i++) {
            this.createEnvironment();
        }
    }

    componentDidMount() {
        this.setUpInitialEnvironments();
    }

    // TODO: Document why render props are being used
    // -- Because we can get the validateForm function as a parameter here
    // -- which means less messy callback code and more isolation of modules

    render(props, {envs, disableSave, disableAddEnv}, context) {
        return (
            <Modal
                onClose={() => props.onCancel()}
                render={({close}) => {
                    return (
                        <div className="modal__backdrop">
                            <div className="modal__dialog">
                                <h4 className="modal__header">Add New Site</h4>
                                <Form
                                    onSubmit={e => this.handleSave(e)}
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
                                                            type="button" disabled={disableAddEnv}>Add Environment</Button>
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