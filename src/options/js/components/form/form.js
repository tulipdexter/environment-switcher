import {h, render, Component} from 'preact';
import './form.css';

export class Form extends Component {
    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <form onSubmit={e => this.props.onSubmit(e)} ref={props.setFormRef} noValidate>
                {props.children}
            </form>
        )
    }
}