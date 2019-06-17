import {h, render, Component} from 'preact';
import './form.css';

class Form extends Component {
    constructor(props) {
        super(props);
    }

    validate() {
        return this.form.checkValidity();
    }

    render(props, state, context) {
        const {render} = props;
        return (
            <form onSubmit={e => this.props.onSubmit(e)} ref={form => this.form = form} noValidate>
                {render({validateForm: this.validate.bind(this)})}
            </form>
        )
    }
}

export {Form};