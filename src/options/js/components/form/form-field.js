import { h, render, Component } from 'preact';
import './form-field.css';

// Allows the importing module to see what variants are available
// TODO: this will be size
// export const variant = {
//     primary: 'primary',
//     default: 'default'
// };

export class FormField extends Component {
    constructor() {
        super();

        this.toggleFocus = this.toggleFocus.bind(this);

        this.state = {
            hasFocus: false
        }
    }

    toggleFocus() {
        console.log('got here');
        this.setState({
            hasFocus: !this.state.hasFocus
        });
    }

    render(props, {hasFocus}) {
        return (
            <div class={'form-field' + (hasFocus ? ' has-focus' : '')}>
                <label class="form-field__label">{this.props.label}:</label>
                <input class="form-field__input" type="text" onFocus={this.toggleFocus} onBlur={this.toggleFocus}/>
            </div>
        );
    }
}