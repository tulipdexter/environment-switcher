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

    // TODO:
    onValidationChange(isValid) {
        console.log(isValid);
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
                                   required
                                   onValidationChange={this.onValidationChange} />
                            {/* Url of the environment */}
                            <Input type={'text'}
                                   title={'Url'}
                                   name={'url'}
                                   required
                                   onValidationChange={this.onValidationChange} />
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}