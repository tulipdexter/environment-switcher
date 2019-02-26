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

        this.nextItemId = 0;

        this.state = {
            defaultEnvs: 2,
            envs: [],
            submitted: false
        };

        // Show two envs by default
        for (let i = 0; i < this.state.defaultEnvs; i++) {
            this.addEnv();
        }
    }

    // Initialize a counter that will increment
    // for each item ID
    makeItem() {
        // Create a new ID
        return {
            id: this.nextItemId++
        };
    }

    // No state mutation
    addEnv() {
        this.setState({
            envs: [...this.state.envs, this.makeItem()]
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted: true
        });

        // Do the chrome stuff here
        console.log(this.state);
    }

    // TODO: You are here
    // Need to get the input values out
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

    handleInputChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    render(props, {envs}) {
        console.log(this.state);
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
                {envs.map(env => {
                    const id = env.id + 1;

                    return (
                        <fieldset>
                            <div className="environment">
                                <h4 className="environment__number">{id}</h4>
                                <div className="environment__fields">
                                    {/* Name of the environment */}
                                    <Input type={'text'}
                                           title={'Name'}
                                           name={'env' + id + '-name'}
                                           value={this.state['envName']}
                                           handleChange={this.handleInputChange}
                                    />
                                    {/* Url of the environment */}
                                    <Input type={'text'}
                                           title={'Url'}
                                           name={'env' + id + '-url'}
                                           value={this.state['envUrl']}
                                           handleChange={this.handleInputChange}
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