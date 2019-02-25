import {h} from 'preact';
import {siteLoader} from "./SiteLoader";
import {NoSites} from "./no-sites/no-sites";

// siteLoader returns a function that takes a Component
// and then returns a wrapper component
export const Display = siteLoader(props => {
    if (props.sites.length > 0) {
        return (<p>Site list will go here</p>);
    } else {
        return <NoSites/>
    }
});