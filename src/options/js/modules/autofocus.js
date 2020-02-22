import {makeArray} from "../util";

export const autofocus = target => {
    const tabbableItems = makeArray(target.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));

    if (tabbableItems.length > 0) {
        const firstTabbableItem = tabbableItems[0];
        firstTabbableItem.focus();

        if (firstTabbableItem.setSelectionRange) {
            firstTabbableItem.setSelectionRange(0, firstTabbableItem.value.length);
        }
    }
};