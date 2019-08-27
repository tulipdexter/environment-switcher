import {h, render, Component} from 'preact';
import {Formfield} from "./form-field";

class Input extends Component {
    constructor(props) {
        super(props);
        this.toggleFocus = this.toggleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: null,
            hasFocus: false,
            isValid: false,
            isEmpty: false,
            customValidity: '',
            errorMessage: null
        };
    }

    toggleFocus() {
        const hasFocus = !this.state.hasFocus;

        this.setState(() => ({
            hasFocus: hasFocus
        }));
    }

    setErrorMessage() {
        let message;

        switch (this.input.type) {
            case 'url':
                message = 'Invalid URL';
                break;
        }

        this.setState({
            errorMessage: message
        });
    }

    validate(value) {
        const isEmpty = this.input.validity.valueMissing;
        let isValid = this.input.validity.valid;

        if (isEmpty !== this.state.isEmpty) {
            this.setState({
                isEmpty: isEmpty
            });
        }

        if (isValid !== this.state.isValid) {
            this.setState({
                isValid: isValid
            });
        }

        if (!isValid) this.setErrorMessage();

        if (this.props.customValidity) {
            // This must be a function because we need to know which input is calling it.
            const customValidity = this.props.customValidity(value);

            if (customValidity !== this.state.customValidity) {
                this.setState({
                    customValidity: customValidity
                }, () => {
                    this.input.setCustomValidity(this.state.customValidity);

                    isValid = this.input.validity.valid;

                    if (isValid !== this.state.isValid) {
                        this.setState({
                            isValid: isValid
                        })
                    }
                });
            }
        }
    }

    handleChange(e) {
        const target = e.target;

        if (this.state.value !== target.value) {
            this.setState({
                value: target.value
            }, () => {
                this.props.onChange(target);
                this.validate(target.value);
            });
        }
    }

    componentDidMount() {
        this.setState({
            isValid: this.input.validity.valid,
            isEmpty: this.input.validity.valueMissing
        })
    }

    render(props, {hasFocus, value, isValid, isEmpty, errorMessage, customValidity}, context) {
        return (
            <Formfield
                label={props.label}
                for={props.name}
                hasFocus={hasFocus}
                isValid={isValid}
                isEmpty={isEmpty}
                customValidity={customValidity}
                errorMessage={errorMessage}>
                <input
                    type={props.type}
                    name={props.name}
                    class="form-field__input"
                    value={value}
                    required={props.required}
                    ref={input => this.input = input}
                    onFocus={this.toggleFocus}
                    onBlur={this.toggleFocus}
                    onChange={e => this.handleChange(e)} />
            </Formfield>
        );
    }
}

export {Input};