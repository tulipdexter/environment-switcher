import { h } from 'preact';
import './header.css';

export const Header = () =>
    <header class="header">
        <div class="header__title">
            Swurl
            <span class="header__strap">URL Switcher</span>
        </div>
        <h1 class="header__subtitle">Options</h1>
    </header>
;