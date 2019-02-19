import { h, render, Component } from 'preact';
import './no-sites.css';

export class NoSites extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div class="no-sites">
                <p class="no-sites__emoji">🙈</p>
                <p class="no-sites__message">Nothing to see here, you need to add your first site</p>
            </div>
        )
    }
}