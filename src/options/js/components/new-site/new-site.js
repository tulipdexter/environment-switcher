import {h, render, Component} from 'preact';
import {Button, variant} from "../button/button";
import {Environment} from "./environment";
import {Form} from "../form/form";
import {Input} from "../form/input";
import {Modal} from "../modal/modal";

import './new-site.css';

class NewSite extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.validateSiteName = this.validateSiteName.bind(this);
        this.validateEnvironmentName = this.validateEnvironmentName.bind(this);

        this.minEnvs = 2;

        this.state = {
            siteName: null,
            envs: [],
            siteNameCustomValidity: '',
            envNameCustomValidity: '',
            disableSave: true,
            disableAddEnv: true,
            currentEnvIndex: null
        };
    }

    createEnvironment() {
        this.setState({
            // No state mutation
            envs: [...this.state.envs, { name: '', url: '' }],
        });
    };

    handleSave(e) {
        console.log(e);
        e.preventDefault();

        const site = {
            siteName: this.state.siteName,
            envs: this.state.envs
        };

        // props.handleSave returns a Promise so we only close modal once
        // the state has changed to say the site is saved.
        this.props.handleSave(site)
            .then(() => this.close());
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

    // TODO: This is working but if you have two values the same and then change the previous one, thus current one doesn't get flagged as fixed.
    validateEnvironmentName(value) {
        console.log('got to validate env');
        let customValidity = '';
        const {envs, currentEnvIndex} = this.state;

        envs.forEach((env, idx) => {
            console.log(idx, currentEnvIndex);
            if (idx === currentEnvIndex) return;

            if (env.name === value) {
                console.log('woop');
                customValidity = 'Env exists';
            }
        });

        return customValidity;
    }

    handleSiteNameChange(input, validateForm) {
        const {value} = input;

        if (value !== this.state.siteName) {
            this.setState({
                siteName: value
            });

            this.validateSiteName(value);
            // const formValidity = validateForm();

            // this.setState({
            //     disableSave: !formValidity,
            //     disableAddEnv: !formValidity
            // });
        }
    }

    handleEnvironmentChange(input, index, validateForm) {
        console.log('got to env change');
        this.setState({
            currentEnvIndex: index
        }, () => console.log('cb', this.state.currentEnvIndex));

        const {name, value} = input;
        const {currentEnvIndex, envs} = this.state;

        envs[currentEnvIndex] = {
            ...envs[currentEnvIndex],
            [name]: value
        };

        // 1: Set the state, irrespective of whether it is duplicated or not
        // 2: The validate callback checks if the length is > 1, and throws error
        this.setState({
            envs: envs
        });

        // const isDuplicate = envs.some(env => env.name === value);
        //
        // if (isDuplicate) {
        //     console.log('is dupe');
        //     this.setState({
        //         // This doesn't work because that state is used for all environments, so both fields show it
        //         // That is why it's a callback function passed to the input to call.
        //         envNameCustomValidity: 'Environment exists'
        //     })
        // } else {
        //     envs[index] = {
        //         ...envs[index],
        //         [name]: value
        //     };
        //
        //     this.setState({
        //         envs: envs, // could shorthand this to just envs (instead of envs: envs)
        //         envNameCustomValidity: ''
        //     }, () => {console.log('is not dupe')});
        // }


        //
        // envs[index] = {
        //     ...envs[index],
        //     [name]: value
        // };
        //
        // this.setState(() => ({
        //     envs: envs
        // }), () => {
        //     // Need to see if more than 1 has the name
        //     console.log(envs.some(env => { console.log('hi', env.name === value);}));
        // });
        //
        // console.log(this.state);

        // console.log(envs, value);
        // console.log(envs.some(env => { console.log('hi', env.name === value);}));
        // this.setState(prevState => ({
        //     ...prevState,
        //     envs: [
        //         ...prevState.envs,
        //         prevState.envs[index]
        //     ]
        // }));

        // Live reference, but only call set state at the end.
        // const envs = [...this.state.envs]; // https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
        //
        // envs[index] = {
        //     ...envs[index],
        //     [name]: value
        // };

        // const envs1 = this.state.envs;

        // const envs = this.state.envs; // TODO: Why does this destructuring work but without it the console

        // console.log(envs1);
        // above will log.
        // const test = {};
        // Object.assign(test, {...envs[index]}, {[name]: value});

        // envs[index] = test;

        // console.log(envs, this.state.envs);
        // const test = Object.assign({}, envs[index], {[name]: value});
        // console.log(test);

        // for (let i = 0; i < test.length; ++i) {
        //     console.log(envs[i].name, value, envs[i].name === value);
        // }

        // this.setState(() => ({envs: envs}), () => {});

        // if (value.length) {
        //     for (let i = 0; i < envs.length; ++i) {
        //         const currentEnv = envs[i];
        //         console.log(currentEnv.name, value, currentEnv.name === value);
        //
        //         // When you make a change, it validates against the previous 'valid' state
        //         // If I type aaa in env 1 that is valid and it will push to state
        //         // If I type aaa in env 2 that is not valid and it won't push to state
        //
        //         if (currentEnv.name === value) {
        //             this.setState({
        //                 envNameCustomValidity: 'Environment exists'
        //             });
        //
        //             break;
        //         }
        //     }
        // }

        // this.setState(() => ({envs: envs}), () => console.log(this.state.envs));

        // const customValidity = this.validateEnvironment(value);
        // console.log(customValidity);

        // Not fixed anything
        // if (!customValidity.length) {
            // const envs = [...this.state.envs];
            // envs[index] = {
            //     ...envs[index],
            //     [name]: value
            // };
            //
            // this.setState({ envs });
        // }


        // const formValidity = validateForm(); // This needs to happen synchronously, after the validateEnvironment
        // stateSet has happened?
        // this.setState({
        //     disableSave: !formValidity,
        //     disableAddEnv: !formValidity
        // });
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
                    // Make close available to other functions
                    // because onSubmit={() => {this.handleSave(); close()}} doesn't work
                    // Doesn't work because you're passing a function as a property so it's called inside Form.
                    // You _could_ create an onSubmitCb property and pass the close function there.
                    this.close = close;
                    return (
                        <div className="modal__backdrop">
                            <div className="modal__dialog">
                                <h4 className="modal__header">Add New Site</h4>
                                <Form
                                    // Need to pass {close} to the onSubmit method here somehow
                                    onSubmit={this.handleSave}
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
                                                            customValidity={this.validateEnvironmentName}
                                                            onChange={input => this.handleEnvironmentChange(input, index, validateForm)}
                                                            required/>
                                                        <Input
                                                            type={'url'}
                                                            label={'Url'}
                                                            name={'url'}
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