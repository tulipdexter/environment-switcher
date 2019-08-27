import {h, render, Component} from 'preact';
import './modal.css';

export class ModalActions extends Component {
    render(props) {
        return (
            <footer className="modal__footer">
                {props.children}
                {props.actions ? props.actions : ''}
            </footer>
        )
    }
}

export class _modal extends Component {
    render(props) {
        if (!props.show) {
            return null;
        }

        // TODO, event listener on escape
        return (
            <div class="modal">
                <div class="modal__backdrop">
                    <div class="modal__dialog">
                        <h4 class="modal__header">{props.header}</h4>
                        {props.children}
                        {props.actions ? <ModalActions actions={props.actions}/> : ''}
                    </div>
                </div>
            </div>
        )
    }
}