document
    .querySelectorAll("script[src='https://www.googletagservices.com/tag/js/gpt.js']")
    .forEach(function (el) {
        // noinspection JSUnresolvedFunction
        el.parentNode.remove()
    });