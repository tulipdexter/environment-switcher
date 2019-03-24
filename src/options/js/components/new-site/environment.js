import {h, render, Component} from 'preact';
import {Input} from "../form/input";
import './new-site.css';

export class Environment extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);

        // Note, need the name: false and the message: null
        // because it could remain invalid but have a different message
        this.state = {
            name: null,
            url: null,
            validation: {
                name: {
                    valid: false,
                    message: null
                },
                url: {
                    valid: false,
                    message: null
                }
            }
        }
    }

    // onChange happens to input
    // the value of that input must be set in state
    // check if it's valid
    // if it's valid state has changed, 

    validate(fieldName, value) {
        const isRequiredMessage = fieldName + ' is required';
        const prevMessage = this.state.validation.fieldName.message; // TODO: fieldName may not work with dot notation
        let newMessage;

        // if validation.name !== this.state.valiation.name

        switch(fieldName) {
            case 'name':
                newMessage = (!value || !value.trim().length > 0) ? isRequiredMessage : null; 
                break;
            case 'url':
                // TODO: Here will check it's a valid URL or valid regex or something
                break;
            default:
                break;
        }

        if (newMessage !== prevMessage) {
            // You are here
            // once you validate this field, how will you know if 
            // the other field(s) are valid?
        }

        // if (valid.name !== this.state.valid.name) {
        //     this.setState({ valid: {name: }}) // need prev state
        // }

        
    }

    handleInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value}, () => {
            this.validate(name, value)
        });
    }

    // TODO:
    onValid() {

    }

    render(props, {name, url, validation}) {
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
                            {validation.name && <span class="error">{valid.name}</span>}
                            {/* Url of the environment */}
                            <Input type={'text'}
                                   title={'Url'}
                                   name={'url'}
                                   value={url}
                                   handleChange={e => this.handleInputChange(e)} />
                            {validation.url && <span class="error">{validation.url}</span>}
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}