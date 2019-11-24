let selector = 'script[src="https://www.googletagservices.com/tag/js/gpt.js"]';

document.querySelectorAll(selector).forEach((el) => {
    el.parentElement.remove();
});
