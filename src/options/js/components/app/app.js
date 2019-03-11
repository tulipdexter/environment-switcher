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

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            loaded: false,
            showModal: false,
            sites: []
        };
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    handleSubmit(e, siteObject) {
        // TODO proptypes for siteObject
        e.preventDefault();

        this.setState({
            sites: [...this.state.sites, siteObject]
        });

        chrome.storage.sync.set({'sites': this.state.sites}, () => {
            console.log('Sites saved');
            this.toggleModal();
        });
    }

    componentDidMount() {
        chrome.storage.sync.get('sites', data => {
            console.log('got here');
            this.setState({
                loaded: true,
                sites: data.sites
            });

            console.log('sites', data.sites);
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
                                <Button variant={variant.primary} size={size.lg} onClick={this.toggleModal}>Add new
                                    site</Button>
                            </div>
                            <Modal show={showModal}
                                   onCancel={this.toggleModal}
                                   header={"Add New Site"}>
                                <NewSiteForm handleSubmit={this.handleSubmit}>
                                    <ModalActions>
                                        <Button variant={variant.default} onClick={this.toggleModal}
                                                type="button">Cancel</Button>
                                        <Button variant={variant.primary} type="submit">Save</Button>
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