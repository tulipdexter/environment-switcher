const browser = chrome; // was `browser || chrome` but that throws an error in chrome ext

// TODO: Icon update
// function updateIcon() {
//     browser.browserAction.setIcon({
//         path: currentBookmark ? {
//             19: "icons/star-filled-19.png",
//             38: "icons/star-filled-38.png"
//         } : {
//             19: "icons/star-empty-19.png",
//             38: "icons/star-empty-38.png"
//         },
//         tabId: currentTab.id
//     });
//     browser.browserAction.setTitle({
//         // Screen readers can see the title
//         title: currentBookmark ? 'Unbookmark it!' : 'Bookmark it!',
//         tabId: currentTab.id
//     });
// }

function initSwitcher(link) {
    const protocol = link.protocol;
    const hostname = link.hostname;
    const port = link.port;
    const pathname = link.pathname;

    console.log(protocol, hostname, port, pathname);
}

function isSupportedProtocol(link) {
    const supportedProtocols = ['https', 'http'];
    return supportedProtocols.indexOf(link.protocol);
}

function createLinkElementFromTabUrl(url) {
    const link = document.createElement('a');
    link.href = url;

    return link;
}

function updateActiveTab() {
    const queryOptions = {
        active: true,
        currentWindow: true
    };

    browser.tabs.query(queryOptions, tabs => {
        const tab = tabs[0];

        if (tab) {
            const link = createLinkElementFromTabUrl(tab.url);
            if (isSupportedProtocol(link)) {
                initSwitcher(link);
            } else {
                console.error(`SwUrl does not support this URL. Expected http(s) but was '${link.protocol}'`);
            }
        }
    });
}

// listen to tab URL changes
// note that this will fire several times as
// various properties of the tabs.Tab object are updated
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
browser.tabs.onUpdated.addListener(updateActiveTab);

// // listen to tab switching
// browser.tabs.onActivated.addListener(init);
//
// // listen for window switching
// browser.windows.onFocusChanged.addListener(init);

// update when the extension loads initially
updateActiveTab();