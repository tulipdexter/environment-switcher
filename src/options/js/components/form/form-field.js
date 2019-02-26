import { h, render, Component } from 'preact';
import './form.css';

export class FormField extends Component {
    constructor(props) {
        super(props);

        this.toggleFocus = this.toggleFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            hasFocus: false
        }
    }

    toggleFocus() {
        this.setState({
            hasFocus: !this.state.hasFocus
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(props, {hasFocus}) {
        return (
            <div class={'form-field' + (hasFocus ? ' has-focus' : '')}>
                {/*TODO: Remove props.for */}
                <label class="form-field__wrap">
                    <span class="form-field__label">{props.labelText}:</span>
                    <input
                        type={props.inputType}
                        class="form-field__input"
                        name={props.inputName}
                        onChange={this.handleInputChange}
                        onFocus={this.toggleFocus}
                        onBlur={this.toggleFocus} />
                </label>
            </div>
        );
    }
}