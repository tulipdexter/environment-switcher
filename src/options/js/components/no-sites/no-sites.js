import {h} from 'preact';
import './no-sites.css';

export const NoSites = () => {
    return (
        <div class="no-sites">
            <p class="no-sites__emoji">🙈</p>
            <p class="no-sites__message">Nothing to see here, you need to add your first site</p>
        </div>
    )
};