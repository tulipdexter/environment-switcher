import {h, render, Component} from 'preact';
import './form.css';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.toggleFocus = this.toggleFocus.bind(this);

        this.state = {
            hasFocus: false,
            value: null,
            isValid: false,
            message: null
        };

        this.validationMessages = {
            required: 'Required'
        };
    }

    toggleFocus() {
        this.setState(prevState => ({
            hasFocus: !prevState.hasFocus
        }));
    }

    validate(value) {
        let isValid;
        // TODO: Messages
        let message;

        if (!value || value.trim().length === 0) {
            isValid = false;
            message = this.validationMessages.required;
        } else {
            isValid = true;
        }

        if (isValid !== this.state.isValid) {
            this.setState(prevState => ({
                isValid: !prevState.isValid
            }));

            console.log(this.state.isValid);
        }
    }

    handleInputChange(e) {
        console.log('ere');
        const {value} = e.target;
        this.setState({value: value}, () => {
            console.log(this.props);
            if (this.props.required) {
                this.validate(value);
            }
        });
    }

    render(props, {hasFocus, value}) {
        return (
            <div class={"form-field" + (hasFocus ? " has-focus" : "")}>
                <label htmlFor={props.name} class="form-field__label">{props.title}</label>
                <input
                    class="form-field__input"
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    required={props.required}
                    placeholder={props.placeholder}
                    value={value}
                    onFocus={this.toggleFocus}
                    onBlur={this.toggleFocus}
                    onChange={e => this.handleInputChange(e)}
                />
                {!this.state.valid && this.state.message && <span>{this.state.message}</span>}
            </div>
        )
    }
}