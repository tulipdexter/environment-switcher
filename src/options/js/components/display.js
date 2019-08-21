import {h} from 'preact';
import {NoSites} from "./no-sites/no-sites";

function Display(props) {
    // TODO: Need to check props is an array
    if (props.sites && props.sites.length) {
        return (
            <ul>
                {props.sites.map(site => {
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

export {Display};