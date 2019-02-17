import { h, render, Component } from 'preact';

export class NoSites extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <p>🙈</p>
                <p>Nothing to see here, you need to add your first site</p>
            </div>
        )
    }
}