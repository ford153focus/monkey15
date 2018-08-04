class Background {
    handleMessage(request, sender, sendResponse) {
        this.notify(request.title, request.message);
    }

    notify(title, message) {
        browser.notifications.create("", {
            message: message,
            title: title,
            type: "basic",
        });
    }
}

let bg = new Background();

browser.runtime.onMessage.addListener(bg.handleMessage);
