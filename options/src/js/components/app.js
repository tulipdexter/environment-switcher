import { h, render, Component } from 'preact';
import { Header } from "./header";
import { Display } from "./display";

export class App extends Component {
    // TODO: Why is props here?
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    render(props, {loading}) {
        if (loading) {
            return (<div>loading...</div>);
        } else {
            return (
                <div>
                    <Header />
                    <div class="container">
                        <Display />
                    </div>
                </div>
            )
        }
    }
}