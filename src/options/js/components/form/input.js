import {h, render, Component} from 'preact';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.toggleFocus = this.toggleFocus.bind(this);

        this.input = null;
        this.setInputRef = element => {
            this.input = element;
        };

        this.state = {
            hasFocus: false,
            value: null,
            valid: false,
            valueMissing: false,
            invalidMessage: null
        };
    }

    toggleFocus() {
        this.setState(prevState => ({
            hasFocus: !prevState.hasFocus
        }));
    }

    setInvalidMessage() {
        let message;

        switch (this.input.type) {
            case 'url':
                message = 'Invalid URL';
                break;
        }

        return message;
    }

    componentDidMount() {
        this.setState({
            valid: this.input.validity.valid,
            valueMissing: this.input.validity.valueMissing,
            invalidMessage: this.setInvalidMessage()
        });
    }

    handleInputChange(e) {
        const target = e.target;
        const {value} = target;
        this.setState({
            value: value,
            valid: target.validity.valid,
            valueMissing: target.validity.valueMissing
        }, () => {
            if (this.state.valid) {
                this.props.onValid(target);
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
                    ref={this.setInputRef}
                    onFocus={this.toggleFocus}
                    onBlur={this.toggleFocus}
                    onChange={e => this.handleInputChange(e)}
                />
                {(!this.state.valid && this.state.valueMissing) && <span class="form-field__helper" aria-live="polite">Required</span>}
                {(!this.state.valid && this.state.value) && <span class="form-field__helper form-field__helper--error">{this.state.invalidMessage}</span>}
            </div>
        )
    }
}