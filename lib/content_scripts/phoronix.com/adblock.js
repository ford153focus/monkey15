document
    .querySelectorAll('script[src="https://www.googletagservices.com/tag/js/gpt.js"]')
    .forEach((el) => {
        el.parentNode.remove()
    });
