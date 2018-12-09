/*eslint no-console: 0*/

class Background {
    handleMessage(request, sender, sendResponse) {
        this.notify(request.title, request.message);

        console.log(sender);
        console.log(sendResponse);
    }

    notify(title, message) {
        browser.notifications.create('', {
            message: message,
            title  : title,
            type   : 'basic'
        });
    }
}

let bg = new Background();

if (typeof browser === 'undefined') {
    browser = chrome;
}

browser.runtime.onMessage.addListener(bg.handleMessage);
