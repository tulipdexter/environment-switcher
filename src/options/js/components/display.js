import { h, render, Component } from 'preact';
import { NoSites } from "./no-sites/no-sites"; // TODO: Should this be index?
import { get } from "./storage";

export class Display extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        return get('sites')
            .then(data => {
                this.setState({ data: data });
            });
    }

    render(props, {data}) {
        // TODO: Render the container and pass the props
        if (data.length > 0) {
            return (<p>Hello sites</p>);
        } else {
            return (<NoSites/>);
        }
    }
}