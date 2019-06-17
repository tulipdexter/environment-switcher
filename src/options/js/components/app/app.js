import {h, render, Component} from 'preact';
import {Header} from "../header/header";
import {Button, variant, size} from "../button/button";
import {NewSite} from "../new-site/new-site";
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleNewSite = this.handleNewSite.bind(this);

        this.state = {
            sites: [],
            saving: false,
            addingSite: false
        }
    }

    handleNewSite(site) {
        // Set saving to true; (or loading?)
        // if it's saving, disable the save and cancel buttons
        // set the chrome storage and in the callback set the state of sites AND saving.
        const updatedSites = [...this.state.sites, site];
        this.setState({
            saving: true
        });

        // console.log(updatedSites);

        chrome.storage.sync.set({'sites': updatedSites}, () => {
            this.setState({
                sites: updatedSites,
                saving: false
            });
        });
    }

    render(props, {addingSite}, context) {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="box">
                        <div className="add-new-site">
                            <Button variant={variant.primary}
                                    size={size.lg}
                                    onClick={() => this.setState({addingSite: true})}>Add new site</Button>
                        </div>
                    </div>
                </div>
                {addingSite &&
                //    on cancel and on save
                <NewSite onCancel={() => this.setState({addingSite: false})} handleSave={this.handleNewSite}/>}
            </div>
        )
    }
}

export {App};