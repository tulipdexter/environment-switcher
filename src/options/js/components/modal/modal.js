import { h, render, Component } from 'preact';
import './modal.css';
import {Button, variant} from "../button/button";

export class Modal extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div class="modal">
                <div class="modal__backdrop">
                    <div class="modal__dialog">
                        <h4 class="modal__title">{this.props.title}</h4>
                        { this.props.children }
                        <Button variant={variant.default} onClick={this.props.onClose}>Cancel</Button>
                        <Button variant={variant.primary} onClick={this.props.onSave}>Save</Button>
                    </div>
                </div>
            </div>
        )
    }
}