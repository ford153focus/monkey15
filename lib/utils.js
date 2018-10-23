window.Utils = class {
    static getExtensionFileContent(filePath) {
        if (typeof browser === 'undefined') {
            var browser = chrome;
        }

        let url = browser.extension.getURL(filePath);
        console.log(url);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
    }

    static str2dom(str) {
        let parser = new DOMParser();
        return parser
            .parseFromString(str, `text/html`)
            .getElementsByTagName(`body`)[0]
            .children;
    }
}
