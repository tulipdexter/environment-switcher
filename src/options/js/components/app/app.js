import { h, render, Component } from 'preact';
import { Header } from "../header/header";
import { Display } from "../display";
import { Button, variant } from "../button/button";
import { Modal } from "../modal/modal";
import { NewSite } from "../new-site/new-site";
import './app.css';

export class App extends Component {
    // TODO: Why is props here?
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            loaded: false,
            showModal: false
        };
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    render(props, {loading, showModal}) {
        if (loading) {
            return (<div>loading...</div>);
        } else {
            return (
                <div>
                    <Header />
                    <div class="container">
                        <div class="box">
                            <div class="add-new-site" onClick={this.toggleModal}>
                                <Button variant={variant.primary}>Add new site</Button>
                            </div>
                            <Modal show={showModal} onClose={this.toggleModal} title={"Add New Site"}>
                                <NewSite />
                            </Modal>
                            <Display />
                        </div>
                    </div>
                </div>
            )
        }
    }
}