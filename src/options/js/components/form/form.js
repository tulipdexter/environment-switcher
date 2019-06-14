import {h, render, Component} from 'preact';
import './form.css';

export class Form extends Component {
    constructor(props) {
        super(props);
    }

    // This will create a state object with all the input fields.
    // When one changes we revalidate the form
    // Any inputs that have an onValid on them are custom callbacks for extra functionality

    // Want to have the validateForm in here
    // And then

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