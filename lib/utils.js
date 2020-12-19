/*eslint no-use-before-define: 0*/

window.Utils = class {
    /**
     * @param {string} filePath - File Path
     * @returns {string} File Content
     */
    static getExtensionFileContent(filePath) {
        let url = typeof browser === 'undefined' ?
            chrome.extension.getURL(filePath) : browser.extension.getURL(filePath);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
    }

    /**
     * Convert string to html node(s)
     * @param {string} str - string of html code
     * @returns {HTMLCollection} converted html elements
     */
    static strToDom(str) {
        let parser = new DOMParser();
        return parser
            .parseFromString(str, 'text/html')
            .getElementsByTagName('body')[0]
            .children;
    }

    /**
     * sleep() for js
     * @param {number} ms - milliseconds of delay
     */
    static sleep(ms) {
        ms += new Date().getTime();
        while (new Date() < ms) {
            // noinspection BadExpressionStatementJS
            true;
        }
    }
};
