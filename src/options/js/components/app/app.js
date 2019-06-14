import {h, render, Component} from 'preact';
import {Header} from "../header/header";
import {Button, variant, size} from "../button/button";
import {NewSite} from "../new-site/new-site";
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingSite: false
        }
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
                <NewSite onCancel={() => this.setState({addingSite: false})}/>}
            </div>
        )
    }
}

export {App};