import {h, Component} from 'preact';
import {NoSites} from "./no-sites/no-sites";

// TODO: This not a class and move the fetch into APP
export class Display extends Component {
    render(props) {
        // TODO: Need to check props is an array
        if (props.sites.length) {
            return (
                <ul>
                    {props.sites.map(site => {
                        console.log(site);
                        return (
                            <li>
                                <p>{site.siteName}</p>
                                <ul>
                                {site.envs.map(env => {
                                    return (
                                        <li>{env.name}, {env.url}</li>
                                    )
                                })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            );
        } else {
            return <NoSites/>
        }
    }
}