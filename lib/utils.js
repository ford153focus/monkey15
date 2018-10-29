window.Utils = class {
    static getExtensionFileContent(filePath) {
        if (typeof browser === 'undefined') {
            // noinspection JSUnresolvedVariable,JSUndeclaredVariable
            var browser = chrome;
        }

        // noinspection JSUnresolvedVariable,JSUnresolvedFunction
        let url = browser.extension.getURL(filePath);
        console.log(url);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
    }

    /**
     * Convert string to html node(s)
     * @param {string} str
     * @returns {HTMLCollection}
     */
    static str2dom(str) {
        let parser = new DOMParser();
        return parser
            .parseFromString(str, 'text/html')
            .getElementsByTagName('body')[0]
            .children;
    }
};
