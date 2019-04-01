import {h, render, Component} from 'preact';
import {Button, variant} from "../button/button";
import {Environment} from "./environment";
import {Input} from "../form/input";
import './new-site.css';

export class NewSiteForm extends Component {
    constructor(props) {
        super(props);
        this.addEnv = this.addEnv.bind(this);

        this.minEnvs = 2;

        this.state = {
            siteName: '',
            envs: [],
            submitted: false,
            validation: {
                siteName: {
                    isValid: false,
                    message: null
                }
            }
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

    onValidationChange(isValid) {
        console.log('sitename input is valid', isValid);
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
                           onValidationChange={this.onValidationChange}
                           required />
                </div>
                <h3>Environments</h3>
                {envs.map((env, index) => {
                    const envNumber = index + 1;
                    return (
                        <Environment key={index} onValidationChange={this.onValidationChange} env={envNumber} />
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