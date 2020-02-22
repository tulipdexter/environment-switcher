export const storage = {
    get: key => {
        return new Promise(resolve => {
            // chrome.storage.sync.get('sites', result => resolve(JSON.parse(result)));
            if (chrome.storage) {
                chrome.storage.sync.get(key, result => resolve(result));
            } else {
                resolve([]);
            }
        });
    },

    set: data => {
        return new Promise(resolve => {
            // const data = JSON.stringify(data);
            chrome.storage.sync.set({key: data}, result => resolve(result));
        });
    },

    remove: () => {
        return new Promise(resolve => {
            chrome.storage.sync.remove([key], result => resolve(result));
        });
    }
};