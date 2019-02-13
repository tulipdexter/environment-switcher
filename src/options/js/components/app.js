import { h, render, Component } from 'preact';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        // fetch the chrome data
        chrome.storage.sync.get('sites', result => {
            this.setState({
                loaded: true
            });
        });
    };

    render(props, {loaded}) {
        if (loaded) {
            return (<div>test</div>);
        }

        return (<p>LOADING</p>);
    }
}