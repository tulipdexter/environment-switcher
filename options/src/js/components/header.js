import { h, render, Component } from 'preact';

export class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header className="header">
                <div className="header__brand">
                    <img src="../../../../icons/logo_48.png" alt="Swurl logo" />
                    <span className="header__strap">Switch Environment</span>
                </div>
                <h1 className="header__title">Options</h1>
            </header>
        )
    }
}