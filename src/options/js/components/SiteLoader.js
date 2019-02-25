import {h, render, Component} from 'preact';

// Higher order component
// See https://daveceddia.com/extract-state-with-higher-order-components/
// This might be moved to a 'lib' dir so it can be used by the browser tool as well
export const siteLoader = WrappedComponent => {
    return class SiteLoader extends Component {
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
            if (!loaded) {
                return <div>Loading...</div>;
            }

            return (
                <WrappedComponent sites={sites} {...props} />
            )
        }
    }
};