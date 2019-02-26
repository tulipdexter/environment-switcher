import {h, render, Component} from 'preact';
import './form.css';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.toggleFocus = this.toggleFocus.bind(this);

        this.state = {
            hasFocus: false
        }
    }

    toggleFocus() {
        this.setState({
            hasFocus: !this.state.hasFocus
        });
    }

    render(props, {hasFocus}) {
        return (
            <div class={"form-field" + (hasFocus ? " has-focus" : "")}>
                <label htmlFor={props.name} class="form-field__label">{props.title}</label>
                <input
                    class="form-field__input"
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.handleChange}
                    placeholder={props.placeholder}
                />
            </div>
        )
    }
}