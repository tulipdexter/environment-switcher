import { h } from 'preact';
import './header.css';

export const Header = () =>
    <header class="header">
        <div class="header__brand">
            {/*Sort path out*/}
            <img src="../../../../icons/logo_48.png" alt="Environment Switcher"/>
            <span class="header__strap">Environment Switcher</span>
        </div>
        <h1 class="header__title">Options</h1>
    </header>
;