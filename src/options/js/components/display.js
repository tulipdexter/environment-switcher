import {h} from 'preact';
import {NoSites} from "./no-sites/no-sites"; // TODO: Should this be index?

export const Display = props => {
    if (props.sites.length > 0) {
        return (<p>Site list will go here</p>);
    } else {
        return (<NoSites/>);
    }
};