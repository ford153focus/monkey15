class Background {
    handleMessage(request, sender, sendResponse) {
        this.notify(request.title, request.message);
    }

    // noinspection JSMethodCanBeStatic
    notify(title, message) {
        // noinspection JSUnresolvedVariable
        browser.notifications.create("", {
            message: message,
            title: title,
            type: "basic",
        });
    }
}

let bg = new Background();

if (typeof browser === 'undefined') {
    // noinspection JSUnresolvedVariable
    browser = chrome;
}

// noinspection JSUnresolvedVariable,JSDeprecatedSymbols
browser.runtime.onMessage.addListener(bg.handleMessage);
