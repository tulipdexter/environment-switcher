import { h, render, Component } from 'preact';
import './button.css';

// Allows the importing module to see what variants are available
export const variant = {
    default: 'default',
    primary: 'primary',
    link: 'link'
};

// Allows the importing module to see what variants are available
export const size = {
    md: 'md',
    lg: 'lg',
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

    static setSize(key) {
        console.log(key);
        const validSize = size.hasOwnProperty(key);
        return validSize ? size[key] : size['default'];
    }

    render(props) {
        return (
            <button class={`button button--${Button.setVariant(props.variant)} button--${Button.setSize(props.size)}`}
                    type={props.type}
                    onClick={props.onClick}>
                {props.children}
            </button>
        )
    }
}