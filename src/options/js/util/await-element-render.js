export const awaitElementRender = element => {
    return new Promise(resolve => {
        if (!element.getBoundingClientRect().width) {
            window.requestAnimationFrame(() => awaitElementRender(element));
        } else {
            resolve();
        }
    })
};