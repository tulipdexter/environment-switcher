import { h, render, Component } from 'preact';
import './button.css';

// Allows the importing module to see what variants are available
export const variant = {
    primary: 'primary',
    default: 'default'
};

export class Button extends Component {
    constructor(props) {
        super(props);
    }

    // TODO: disabled state

    render(props) {
        const config = {
            className: 'button' + (props.variant ? ` button--${props.variant}`: '')
        };

        return (
            <button class={config.className} onClick={this.props.onClick}>{props.children}</button>
        )
    }
}