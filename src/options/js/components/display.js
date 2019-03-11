import {h, Component} from 'preact';
import {NoSites} from "./no-sites/no-sites";

// TODO: This not a class and move the fetch into APP
export class Display extends Component {
    render(props) {
        if (props.sites.length > 0) {
            return (<p>Site list will go here</p>);
        } else {
            return <NoSites/>
        }
    }
}