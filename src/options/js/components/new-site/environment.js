import {h, render, Component} from 'preact';
import {Input} from "../form/input";
import './new-site.css';

export class Environment extends Component {
    constructor(props) {
        super(props);
        this.onValid = this.onValid.bind(this);

        this.state = {
            name: null,
            url: null
        }
    }

    onValid(input) {
        this.props.onValid(input, this.props.index);
    }

    render(props, {name, url}) {
        return (
            <fieldset>
                <div className="environment">
                    <h4 className="environment__number">{props.env}</h4>
                    <div className="environment__fields">
                        <div className="form-group">
                            {/* Name of the environment */}
                            <Input type={'text'}
                                   title={'Name'}
                                   name={'name'}
                                   onValid={this.onValid}
                                   required />
                            {/* Url of the environment */}
                            <Input type={'url'}
                                   title={'Url'}
                                   name={'url'}
                                   onValid={this.onValid}
                                   required />
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}