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
            customValidity: ''
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

        return message;
    }

    validate(value) {
        const isEmpty = this.input.validity.valueMissing;

        if (isEmpty && (isEmpty !== this.state.isEmpty)) {
            this.setState({
                isEmpty: isEmpty
            });
        } else {
            if (this.props.customValidity) {
                const customValidity = this.props.customValidity(value);

                if (customValidity !== this.state.customValidity) {
                    this.setState({
                        customValidity: customValidity
                    }, () => {
                        this.input.setCustomValidity(this.state.customValidity);
                    })
                }
            }
            const isValid = this.input.validity.valid;

            if (isValid !== this.state.isValid) {
                this.setState({
                    isValid: isValid
                })
            }
        }
    }

    // validate(value) {
    //     // Custom validation to be done in here
    //     // this.props.customValidity
    //     const isHtml5Valid = this.input.validity.valid;
    //     const isHtml5Empty = this.input.validity.valueMissing;
    //
    //     if (this.state.isEmpty !== isHtml5Empty) {
    //         this.setState({
    //             isEmpty: isHtml5Empty
    //         })
    //     }
    //
    //     // Validate against HTML5
    //     // If it's inValid and different to state, setState.
    //     // If it's Valid, check the custom validity.
    //
    //     // html5 invalid, no need to do custom
    //     if (!isHtml5Valid && (isHtml5Valid !== this.state.isValid)) {
    //         this.setState({
    //             isValid: isHtml5Valid
    //         })
    //     } else {
    //         const isCustomValid = this.props.customValidity(value);
    //
    //         if (!isCustomValid && (isCustomValid !== this.state.isValid)) {
    //             this.setState({
    //                 isValid: isCustomValid
    //             })
    //         }
    //     }
    // }

    handleChange(e) {
        const target = e.target;

        if (this.state.value !== target.value) {
            this.setState({
                value: target.value
            }, () => {
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

    render(props, {hasFocus, value, isValid, isEmpty, customValidity}) {
        return (
            <Formfield label={props.label}
                       for={props.name}
                       hasFocus={hasFocus}
                       isValid={isValid}
                       isEmpty={isEmpty}
                       customValidity={customValidity}>
                <input type={props.type}
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