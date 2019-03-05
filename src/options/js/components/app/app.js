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

        this.state = {
            showModal: false
        };
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    render(props, {showModal}) {
        return (
            <div>
                <Header />
                <div class="container">
                    <div class="box">
                        <div class="add-new-site">
                            <Button variant={variant.primary} size={size.lg} onClick={this.toggleModal}>Add new site</Button>
                        </div>
                        <Modal show={showModal}
                               onCancel={this.toggleModal}
                               header={"Add New Site"}>
                            <NewSiteForm>
                                <ModalActions>
                                    <Button variant={variant.default} onClick={this.toggleModal} type="button">Cancel</Button>
                                    <Button variant={variant.primary} type="submit">Save</Button>
                                </ModalActions>
                            </NewSiteForm>
                        </Modal>
                        <Display />
                    </div>
                </div>
            </div>
        )
    }
}