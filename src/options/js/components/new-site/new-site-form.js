import {h, render, Component} from 'preact';
import {Button, variant} from "../button/button";
import {Environment} from "./environment";
import {Input} from "../form/input";
import './new-site.css';

export class NewSiteForm extends Component {
    constructor(props) {
        super(props);
        this.addEnv = this.addEnv.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);

        this.minEnvs = 2;

        this.state = {
            siteName: '',
            envs: [],
            submitted: false,
            valid: false
        };

        // Setup initial envs
        for (let i = 0; i < this.minEnvs; i++) {
            this.addEnv();
        }
    }

    // No state mutation
    addEnv() {
        this.setState({
            envs: [...this.state.envs, { name: '', url: '' }]
        });
    };

    handleInputChange(e, i) {
        const {name, value} = e.target;

        if (name === 'siteName') {
            this.setState({ siteName: value })
        } else {
            const envs = [...this.state.envs]; // Already an array? No need to spread
            envs[i] = {
                ...envs[i],
                [name]: value
            };
            this.setState({ envs });    
        }
    }

    validate() {
        return new Promise((resolve, reject) => {
            if (this.state.siteName.trim().length === 0) reject();
            if (this.state.envs.length) {
                console.log('here');
                return Promise.all(Object.entries(this.state.envs).map(([idx, env]) => {
                    return new Promise((resolve, reject) => {
                        const validFields = (env.name.trim().length > 0 && env.url.trim().length > 0);
                        if (validFields) {
                            resolve()
                        } else {
                            reject();
                        }
                    });
                }))
                    .then(() => resolve())
                    .catch(() => reject());
            }
        });
    }

    render(props, {envs}) {
        // console.log('test',this.validate().then(() => console.log('yay')).catch(() => console.log('Nay')));
        //     this.validate()
        //         .then(() => true)
        //         .catch(() => false);
        return (
            <form onSubmit={e => props.handleSubmit(e, this.state)} >
                <div class="mb-3">
                    {/* Name of the site */}
                    <Input type={'text'}
                           title={'Site name'}
                           name={'siteName'}
                           value={this.state['siteName']}
                           handleChange={e => this.handleInputChange(e)}
                           required />
                </div>
                <h3>Environments</h3>
                {envs.map((env, index) => {
                    const envNumber = index + 1;
                    return (
                        <Environment key={index} onInvalid={this.onInvalid} onValid={this.onValid} env={envNumber} />
                    )
                })}
                <div class="add-environment">
                    <Button variant={variant.link} onClick={this.addEnv} type="button" disabled>Add Environment</Button>
                </div>
                {props.children}
            </form>
        )
    }
}