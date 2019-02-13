import { Component } from 'preact';

export class Display extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    };

    render(props, {loading}) {
        return (
            <div>hello</div>
        );
    }
}