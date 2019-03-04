import {h, render, Component} from 'preact';
import {Button, variant} from "../button/button";
import {Input} from "../form/input";
import './new-site.css';

export class NewSiteForm extends Component {
    constructor(props) {
        super(props);
        this.addEnv = this.addEnv.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.minEnvs = 2;

        this.state = {
            name: '',
            envs: [],
            submitted: false
        };

        // Setup initial envs
        for (let i = 0; i < this.minEnvs; i++) {
            this.addEnv();
        }
    }

    // No state mutation
    // It's possible that new Array(this.state)
    addEnv() {
        this.setState({
            envs: [...this.state.envs, { name: '', url: '' }]
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted: true,
        });

        // Validate


        // Do the chrome stuff here
        // console.log(this.state);
    }

    // TODO: You are here
    // Need to get the input values out
    // This is where you reorg the state
    // or 
    saveSite() {
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

    handleInputChange(e, i) {
        const {name, value} = e.target;

        const envs = [...this.state.envs];
        envs[i] = {
            ...envs[i],
            [name]: value
        };
        this.setState({ envs });
    }

    render(props, {envs}) {
        console.log(envs);
        return (
            <form onSubmit={this.handleSubmit}>
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
                            <div className="environment">
                                <h4 className="environment__number">{envNumber}</h4>
                                <div className="environment__fields">
                                    {/* Name of the environment */}
                                    <Input type={'text'}
                                           title={'Name'}
                                           name={'name'}
                                           value={envs[index].name}
                                           handleChange={e => this.handleInputChange(e, index)}
                                    />
                                    {/* Url of the environment */}
                                    <Input type={'text'}
                                           title={'Url'}
                                           name={'url'}
                                           value={envs[index].url}
                                           handleChange={e => this.handleInputChange(e, index)}
                                    />
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