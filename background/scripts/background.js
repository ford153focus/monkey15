/*eslint no-console: 0*/

class Background {
    handleMessage(request, sender, sendResponse) {
        this.notify(request.title, request.message);

        console.log(sender);
        console.log(sendResponse);
    }

    notify(title, message) {
        chrome.notifications.create('', {
            message: message,
            title  : title,
            type   : 'basic'
        });
    }
}

if (typeof browser === 'undefined') {
    browser = chrome;
}

let bg = new Background();

browser.runtime.onMessage.addListener(bg.handleMessage);
