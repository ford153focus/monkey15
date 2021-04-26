window._frt = {};

document.removeSelectorAll = (selector) => {
    for (const el of document.querySelectorAll(selector)) {
        el.remove();
    }
}

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
    console.log(json);
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
 * Dynamically load Bootstrap-library
 */
window._frt.loadBootstrap = () => {
    let tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css';
    tag.crossorigin = 'anonymous';
    document.head.appendChild(tag);

    let popperScript = document.createElement('script');
    popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js';
    popperScript.crossorigin = 'anonymous';
    document.head.appendChild(popperScript);

    let bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js';
    bootstrapScript.crossorigin = 'anonymous';
    document.head.appendChild(bootstrapScript);
}

/**
 * Dynamically load font awesome
 */
window._frt.loadFontAwesome = () => {
    let tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.href = 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
    tag.crossorigin = 'anonymous';
    document.head.appendChild(tag);
}

/**
 * Sleep implementation in JS
 * @param {number} ms Sleep length
 */
window._frt.sleep = (ms) => {
    ms += new Date().getTime();
    while (new Date() < ms) {
        // noinspection BadExpressionStatementJS
        true;
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
