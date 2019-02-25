import { h, render, Component } from 'preact';
import { Environment } from "./environment";

export class EnvironmentList extends Component {
    render(props) {
        return (
            <div>
                {props.items.map(item => <Environment id={item.id + 1}/>)}
            </div>
        );
    }
}