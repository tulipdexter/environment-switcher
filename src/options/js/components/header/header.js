import { h, render, Component } from 'preact';
import './header.css';

export class Header extends Component {
    constructor() {
        super();
    }

    render() {
        // TODO: Sort that path out
        return (
            <header class="header">
                <div class="header__brand">
                    <img src="../../../../icons/logo_48.png" alt="Environment Switcher" />
                    <span class="header__strap">Environment Switcher</span>
                </div>
                <h1 class="header__title">Options</h1>
            </header>
        )
    }
}