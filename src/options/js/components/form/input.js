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
        })
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
                })
            }
        }
    }

    handleChange(e) {
        const target = e.target;

        if (this.state.value !== target.value) {
            this.setState({
                value: target.value
            }, () => {
                this.validate(target.value);

                // TODO: props.index is purely for environment
                // Want to move it out of this generic input component
                if (this.props.index || this.props.index === 0) { // 0 is falsy
                    this.props.onChange(target, this.props.index);
                } else {
                    this.props.onChange(target);
                }
            });
        }
    }

    componentDidMount() {
        this.setState({
            isValid: this.input.validity.valid,
            isEmpty: this.input.validity.valueMissing
        })
    }

    render(props, {hasFocus, value, isValid, isEmpty, customValidity, errorMessage}, context) {
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