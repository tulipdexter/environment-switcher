import {h, render, Component} from 'preact';
import {Input} from "../form/input";
import './new-site.css';

export class Environment extends Component {
    constructor(props) {
        super(props);

        // Note, need the name: false and the message: null
        // because it could remain invalid but have a different message
        this.state = {
            name: null,
            url: null,
            validation: {
                name: {
                    isValid: false,
                    message: null
                },
                url: {
                    isValid: false,
                    message: null
                }
            }
        }
    }

    // validate(fieldName, value) {
    //     const isRequiredMessage = fieldName + ' is required';                                
    //     const prevValidState = this.state.validation.fieldName.isValid;
    //     const prevMessage = this.state.validation.fieldName.message; // TODO: fieldName may not work with dot notation

    //     let newValidState;
    //     let newMessage;

    //     switch(fieldName) {
    //         case 'name':
    //             if (!value || !value.trim().length > 0) {

    //             }
    //             newMessage =  ? isRequiredMessage : null; 
    //             break;
    //         case 'url':
    //             // TODO: Here will check it's a valid URL or valid regex or something
    //             break;
    //         default:
    //             break;
    //     }

    //     // if a change made 1 valid
    //     // are they all now valid
    //     // if yes, you can call the props.onValid
    //     // if a change made 1 invalid
    //     // if it is the only invalid one, call the props.onInvalid

    //     if (newMessage !== prevMessage) {


    //         //Object.values(prevValidationState).map(value => {

    //         // });

    //         // once you validate this field, how will you know if 
    //         // the other field(s) are valid?
    //         // Object.keys.map
    //     }

    //     // if (valid.name !== this.state.valid.name) {
    //     //     this.setState({ valid: {name: }}) // need prev state
    //     // }

        
    // }

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
                                   required />
                            {/* Url of the environment */}
                            <Input type={'text'}
                                   title={'Url'}
                                   name={'url'}
                                   required />
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}