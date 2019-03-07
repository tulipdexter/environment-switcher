import {h, render, Component} from 'preact';
import {set} from "../storage";
import {Button, variant} from "../button/button";
import {Input} from "../form/input";
import './new-site.css';

export class NewSiteForm extends Component {
    constructor(props) {
        super(props);
        this.addEnv = this.addEnv.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.minEnvs = 2;

        this.state = {
            siteName: '',
            envs: [],
            submitted: false
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
            const envs = [...this.state.envs];
            envs[i] = {
                ...envs[i],
                [name]: value
            };
            this.setState({ envs });    
        }
    }

    render(props, {envs}) {
        return (
            <form thing={props.handleSubmit(this.state)}>
                <div class="mb-3">
                    {/* Name of the site */}
                    <Input type={'text'}
                           title={'Site name'}
                           name={'siteName'}
                           value={this.state['siteName']}
                           handleChange={this.handleInputChange}
                    />
                </div>
                <h3>Environments</h3>
                {envs.map((env, index) => {
                    const envNumber = index + 1;

                    return (
                        <fieldset>
                            <div class="environment">
                                <h4 class="environment__number">{envNumber}</h4>
                                <div class="environment__fields">
                                    <div class="form-group">
                                        {/* Name of the environment */}
                                        <Input type={'text'}
                                               title={'Name'}
                                               name={'name'}
                                               value={envs[index].name}
                                               handleChange={e => this.handleInputChange(e, index)} />
                                        {/* Url of the environment */}
                                        <Input type={'text'}
                                               title={'Url'}
                                               name={'url'}
                                               value={envs[index].url}
                                               handleChange={e => this.handleInputChange(e, index)} />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    )
                })}
                <div class="add-environment">
                    <Button variant={variant.link} onClick={this.addEnv} type="button">Add Environment</Button>
                </div>
                {props.children}
            </form>
        )
    }
}