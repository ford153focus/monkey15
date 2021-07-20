document.removeSelectorAll = (selector, method='remove') => {
    let elements = document.querySelectorAll(selector);
    for (let el of elements) {
        switch (method) {
            case 'clear':
                el.innerHTML = '';
                break;
            case 'hide':
                el.style.display = 'none';
                break;
            case 'remove':
            default:
                el.remove();
                break;
        }
    }
}

window._frt = {};

window._frt.getExtensionFileContent = (filePath) => {
    let url = browser.runtime.getURL(filePath);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}

/**
 * Fetch json from api in modern style
 * use with await
 * @param {string} url target link
 * @returns {Promise<any>} decoded json-object
 */
window._frt.fetchJson = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Fetch json from api synchronously
 * @param {string} url Link to api-method
 * @returns {any} Parsed JSON-object
 */
window._frt.fetchJsonSync = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
}

/**
 * Inject style sheet to current page
 * @param {string} url url of style sheet
 */
window._frt.loadStyleSheet = (url) => {
    let tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.href = url;
    tag.crossorigin = 'anonymous';
    document.head.appendChild(tag);
}

/**
 * Inject script to current page
 * @param {string} url url of script
 */
window._frt.loadScriptFile = (url) => {
    let tag = document.createElement('script');
    tag.src = url;
    tag.crossorigin = 'anonymous';
    document.head.appendChild(tag);
}

/**
 * Dynamically load Twitter's Bootstrap
 */
window._frt.loadBootstrap = () => {
    window._frt.loadStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    window._frt.loadScriptFile('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
}

/**
 * Dynamically load Font Awesome
 */
window._frt.loadFontAwesome = () => {
    window._frt.loadStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
}

/**
 * Async sleep implementation in JS
 * @param {number} msec Sleep length
 */
window._frt.sleep = (msec) => {
    // eslint-disable-next-line no-new
    new Promise(
        // eslint-disable-next-line no-unused-vars
        resolve => setTimeout(_ => resolve(), msec)
    );
}

/**
 * Sleep implementation in JS
 * @param {number} msec Sleep length
 */
window._frt.sleepSync = (msec) => {
    msec += new Date().getTime();
    while (new Date() < msec) {
        continue;
    }
}

/**
 * Strip all html tags
 * @param {string} html Original html-code
 * @returns {string} Stripped text
 */
window._frt.stripTags = (html) => {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

/**
 *
 * @param {string} str Original HTML-code
 * @returns {HTMLCollection} HTML-tags
 */
window._frt.strToDom = (str) => {
    let parser = new DOMParser();
    let document = parser.parseFromString(str, 'text/html');
    return document.body.children;
}
