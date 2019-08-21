import {h, render, Component} from 'preact';
import {Header} from "../header/header";
import {Button, variant, size} from "../button/button";
import {Display} from "../display";
import {_modal, ModalActions} from "../modal/modal";
import {NewSiteForm} from "../new-site/new-site-form";
import './app.css';

export class _app extends Component {
    constructor() {
        super();

        this.toggleState = this.toggleState.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.clearStorage = this.clearStorage.bind(this);

        this.state = {
            loaded: false,
            saving: false,
            showModal: false,
            buttonDisabled: true,
            sites: [],
        };
    }

    clearStorage() {
        chrome.storage.sync.clear(() => {
            console.log('storage cleared');
        });
    }

    toggleState(key) {
        this.setState(prevState => ({
            [key]: !prevState[key]
        }));
    };

    handleSave(site) {
        console.log('hs', site);
        // Set saving to true; (or loading?)
        // if it's saving, disable the save and cancel buttons
        // set the chrome storage and in the callback set the state of sites AND saving.
        const updatedSites = [...this.state.sites, site];
        this.toggleState('saving');

        // console.log(updatedSites);

        chrome.storage.sync.set({'sites': updatedSites}, () => {
            this.toggleState('saving');

            this.setState({
                sites: updatedSites
            }, () => {
                this.toggleState('showModal');
                this.toggleState('saving');
            });
        });
    }

    componentDidMount() {
        // TODO: data fetching in a separate module
        chrome.storage.sync.get('sites', data => {
            this.setState({
                loaded: true,
            });
            if (data.sites && data.sites.length) {
                this.setState({
                    sites: data.sites
                });
            }
        });
    }

    // NEED TO FIND A WAY TO RERUN THE FORM VALIDATION IF THE INPUT CHANGES AND PASS IT ALL THE WAY BACK UP
    render(props, {loaded, showModal, sites}) {
        if (!loaded) {
            // TODO: Spinner of some sort
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Header/>
                    <Button variant={variant.default}
                            onClick={this.clearStorage}
                            type="button">Clear storage</Button>

                    <div class="container">
                        <div class="box">
                            <div class="add-new-site">
                                <Button variant={variant.primary}
                                        size={size.lg}
                                        onClick={() => this.toggleState('showModal')}>Add new site</Button>
                            </div>
                            <_modal show={showModal}
                                    onCancel={() => this.toggleState('showModal')}
                                    header={"Add New Site"}>
                                <NewSiteForm onValid={() => this.setState({buttonDisabled: false})}
                                             onInvalid={() => this.setState({buttonDisabled: true})}
                                             sites={sites}
                                             handleSave={this.handleSave}>
                                    <ModalActions>
                                        <Button variant={variant.default}
                                                onClick={() => this.toggleState('showModal')}
                                                type="button">Cancel</Button>
                                        <Button variant={variant.primary}
                                                type="submit"
                                                disabled={this.state.buttonDisabled}>Save</Button>
                                    </ModalActions>
                                </NewSiteForm>
                            </_modal>
                            <Display sites={sites}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}