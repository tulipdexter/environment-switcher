import {h, render, Component} from 'preact';
import {Input} from "../form/input";
import './new-site.css';

export class Environment extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);

        this.state = {
            name: null,
            url: null,
            isValid: false
        }
    }

    handleInputChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    validate(name, url) {
        return {
            name: !name || name.trim().length === 0 ? 'Name is required' : false,
            url: !url || url.trim().length === 0 ? 'Url is required' : false
        }
    }

    // TODO:
    onValid() {

    }

    render(props, {name, url}) {
        const errors = this.validate(name, url);
        console.log(errors.name);
        return (
            <fieldset>
                <div className="environment">
                    <h4 className="environment__number">{props.env}</h4>
                    <div className="environment__fields">
                        <div className="form-group">
                            {/* Name of the environment */}
                            <Input type={'text'}
                                   title={'Name'}
                                   name={'name'}
                                   value={name}
                                   handleChange={e => this.handleInputChange(e)} />
                            {errors.name && <span class="error">{errors.name}</span>}
                            {/* Url of the environment */}
                            <Input type={'text'}
                                   title={'Url'}
                                   name={'url'}
                                   value={url}
                                   handleChange={e => this.handleInputChange(e)} />
                            {errors.url && <span class="error">{errors.url}</span>}
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}