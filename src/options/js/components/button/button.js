import { h, render, Component } from 'preact';
import './button.css';

// Allows the importing module to see what variants are available
export const variant = {
    default: 'default',
    primary: 'primary',
    link: 'link'
};

export class Button extends Component {
    constructor(props) {
        super(props);

        // TODO: handle disabled state
        this.state = {
            disable: false
        }
    }

    static setVariant(key) {
        const validVariant = variant.hasOwnProperty(key);
        return validVariant ? variant[key] : variant['default'];
    }

    render(props) {
        return (
            <button class={`button button--${Button.setVariant(props.variant)}`}
                    type={props.type}
                    onClick={props.onClick}>
                {props.children}
            </button>
        )
    }
}