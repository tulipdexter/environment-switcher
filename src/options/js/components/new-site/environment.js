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
                name: null,
                url: null
            }
        }
    }

    validate(fieldName, value) {
        const isRequiredMessage = fieldName + ' is required';
        const prevValidationState = this.state.validation;
        const prevMessage = prevValidationState.fieldName; // TODO: fieldName may not work with dot notation
        let newMessage;

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

        // if a change made 1 valid
        // are they all now valid
        // if yes, you can call the props.onValid
        // if a change made 1 invalid
        // if it is the only invalid one, call the props.onInvalid

        if (newMessage !== prevMessage) {
            // if new message is null (it's valid)

            // You are here

            //Object.values(prevValidationState).map(value => {

            // });

            // once you validate this field, how will you know if 
            // the other field(s) are valid?
            // Object.keys.map
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