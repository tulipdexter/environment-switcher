import {h, render, Component} from 'preact';
import {Input} from "../form/input";
import './new-site.css';

export class Environment extends Component {
    constructor(props) {
        super(props);
        this.onValidationChange = this.onValidationChange.bind(this);

        this.state = {
            name: null,
            url: null,
            valid: false
        }
    }

    // TODO:
    onValidationChange(isValid) {
        // if isValid !== this.state.valid, call the parent cb
        // Todo: Set the state of valid when it changes (like input)
        console.log(isValid, this.state.valid);

        //props.onValidationChange()
        // console.log(isValid === this.state.valid);
    }

    render(props, {name, url, valid}) {
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