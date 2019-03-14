import {h, render, Component} from 'preact';
import {Header} from "../header/header";
import {Button, variant, size} from "../button/button";
import {Display} from "../display";
import {Modal, ModalActions} from "../modal/modal";
import {NewSiteForm} from "../new-site/new-site-form";
import './app.css';

export class App extends Component {
    // TODO: Why is props here?
    constructor(props) {
        super(props);

        this.toggleState = this.toggleState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            loaded: false,
            saving: false,
            showModal: false,
            sites: []
        };
    }

    toggleState(key) {
        this.setState(prevState => ({
            [key]: !prevState[key]
        }));
    };

    handleSubmit(e, siteObject) {
        // TODO proptypes for siteObject
        e.preventDefault();

        // Set saving to true; (or loading?)
        // if it's saving, disable the save and cancel buttons
        // set the chrome storage and in the callback set the state of sites AND saving.

        const updatedSites = [...this.state.sites, siteObject];
        this.toggleState('saving');

        chrome.storage.sync.set({'sites': updatedSites}, () => {
            this.setState({
                sites: updatedSites
            });
            this.toggleState('showModal');
            this.toggleState('saving');
        });
    }

    componentDidMount() {
        chrome.storage.sync.get('sites', data => {
            console.log('got here');
            this.setState({
                loaded: true,
                sites: data.sites
            });
        });
    }

    render(props, {loaded, showModal, sites}) {
        if (!loaded) {
            // TODO: Spinner of some sort
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Header/>
                    <div class="container">
                        <div class="box">
                            <div class="add-new-site">
                                <Button variant={variant.primary}
                                        size={size.lg}
                                        onClick={() => this.toggleState('showModal')}>Add new site</Button>
                            </div>
                            <Modal show={showModal}
                                   onCancel={() => this.toggleState('showModal')}
                                   header={"Add New Site"}>
                                <NewSiteForm handleSubmit={this.handleSubmit}>
                                    <ModalActions>
                                        <Button variant={variant.default}
                                                onClick={() => this.toggleState('showModal')}
                                                type="button">Cancel</Button>
                                        <Button variant={variant.primary}
                                                type="submit">Save</Button>
                                    </ModalActions>
                                </NewSiteForm>
                            </Modal>
                            <Display sites={sites}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}