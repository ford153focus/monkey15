export class Utils {
    static getExtensionFileContent(filePath) {
        let url = browser.extension.getURL(filePath);
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
