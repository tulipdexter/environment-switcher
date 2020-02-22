const icons = {
    add: (w = 14, h = 14) => {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 24">
                <path d="M23 11H13V1c0-.6-.5-1-1-1s-1 .5-1 1v10H1c-.6 0-1 .5-1 1s.5 1 1 1h10v10c0 .6.5 1 1 1s1-.5 1-1V13h10c.6 0 1-.5 1-1s-.5-1-1-1z"/>
            </svg>
        `;
    },
    remove: (w = 12, h = 12) => {
        return `
            <svg id="badge_remove" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 12 12">
                <path d="M6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM1.69,7.08V4.92h8.62V7.08Z"/>
            </svg>
        `;
    }
};

export {icons};