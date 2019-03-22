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
        this.handleValidation = this.handleValidation.bind(this);
        this.clearStorage = this.clearStorage.bind(this);

        this.state = {
            loaded: false,
            saving: false,
            showModal: false,
            formValid: false,
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

    handleSubmit(e, siteObject) {
        // TODO proptypes for siteObject
        e.preventDefault();
        console.log(siteObject);

        // Set saving to true; (or loading?)
        // if it's saving, disable the save and cancel buttons
        // set the chrome storage and in the callback set the state of sites AND saving.
        console.log('sites', this.state.sites);
        const updatedSites = [...this.state.sites, siteObject];
        this.toggleState('saving');

        chrome.storage.sync.set({'sites': updatedSites}, () => {
            this.setState({sites: updatedSites}, () => {

            });
            this.toggleState('showModal');
            this.toggleState('saving');
        });
    }

    componentDidMount() {
        chrome.storage.sync.get('sites', data => {
            console.log('data', data);
            console.log(data.sites);
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

    handleValidation(isValid) {
        isValid
            // .then(() => this.setState({
            //     formValid: true,
            // }))
            // .catch(() => this.setState({
            //     formValid: false,
            // }));
    }

    render(props, {loaded, showModal, sites, formValid}) {
        if (!loaded) {
            // TODO: Spinner of some sort
            return <div>Loading...</div>;
        } else {
            console.log('valid', formValid);
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
                            <Modal show={showModal}
                                   onCancel={() => this.toggleState('showModal')}
                                   header={"Add New Site"}>
                                <NewSiteForm handleSubmit={this.handleSubmit} handleValidation={this.handleValidation}>
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