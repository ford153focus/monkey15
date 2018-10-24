class Phoronix {
    constructor() {
        this.adBlock();
        this.setShortCuts();
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Ads broking menu
     */
    adBlock() {
        document
            .querySelectorAll("script[src='https://www.googletagservices.com/tag/js/gpt.js']")
            .forEach(function (el) {
                // noinspection JSUnresolvedFunction
                el.parentNode.remove()
            });
    }

    /**
     * ShortCuts for pager
     */
    setShortCuts() {
        document.addEventListener('keypress', (event) => {
            if (event.code === "ArrowLeft" && event.ctrlKey === true) {
                // noinspection JSUnresolvedFunction
                document.querySelector("#main article .foot .pagination span").previousSibling.click();
            }
            if (event.code === "ArrowRight" && event.ctrlKey === true) {
                // noinspection JSUnresolvedFunction
                document.querySelector("#main article .foot .pagination span").nextSibling.click();
            }
        });
    }
}

window.onload = function () {
    setTimeout(function () {
        new Phoronix();
    }, 333);
};