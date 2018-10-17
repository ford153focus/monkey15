/**
 * ShortCuts for pager
 */
document.addEventListener('keypress', (event) => {
    if (event.code==="ArrowLeft" && event.ctrlKey===true) {
        document.querySelector("#main article .foot .pagination span").previousSibling.click();
    }
    if (event.code==="ArrowRight" && event.ctrlKey===true) {
        document.querySelector("#main article .foot .pagination span").nextSibling.click();
    }
});

/**
 * AdBlock :D
 */
document
    .querySelectorAll("script[src='https://www.googletagservices.com/tag/js/gpt.js']")
    .forEach(function(el){el.parentNode.remove()});