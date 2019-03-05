import {h, Component} from 'preact';
import {NoSites} from "./no-sites/no-sites";

export class Display extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            sites: null
        }
    }

    componentDidMount() {
        chrome.storage.sync.get('sites', sites => {
            this.setState({
                loaded: true,
                sites: sites
            });
        });
    }

    render(props, {loaded, sites}) {
        console.log(loaded);

        if (!loaded) {
            // TODO: Spinnger of some sort
            return <div>Loading...</div>;
        }

        if (sites.length > 0) {
            return (<p>Site list will go here</p>);
        } else {
            return <NoSites/>
        }
    }
}