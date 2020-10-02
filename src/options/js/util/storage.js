export const storage = {
    get: key => {
        return new Promise(resolve => {
            // chrome.storage.sync.get('sites', result => resolve(JSON.parse(result)));
            chrome.storage.sync.get(key, result => resolve(result));
        });
    },

    set: data => {
        return new Promise(resolve => {
            // const data = JSON.stringify(data);
            chrome.storage.sync.set(data, result => {
                resolve(result);
            });
        });
    },

    remove: key => {
        return new Promise(resolve => {
            chrome.storage.sync.remove([key], result => resolve(result));
        });
    }
};
