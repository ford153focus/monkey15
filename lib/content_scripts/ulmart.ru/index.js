class Ulmart {
    constructor() {
        try { this.setFilter(); } catch (e) { console.debug(e); }
        try { this.setView(); } catch (e) { console.debug(e); }
        try { this.setSort(); } catch (e) { console.debug(e); }

        setInterval(function() {
            try { Ulmart.removeReserved(); } catch (e) { console.debug(e); }
            try { Ulmart.removeBroken(); } catch (e) { console.debug(e); }
            try { Ulmart.loadMore(); } catch (e) { console.debug(e); }
        }.bind(this), 4444);
    }

    /**
     * Load more
     */
    static loadMore() {
        const btnMore = document.querySelector("span.btn-product-more");
        if (btnMore !== null && btnMore.className.includes("g-hidden") === false) {
            btnMore.click();
        }
    }

    /**
     * Remove out-of-order items
     */
    static removeBroken() {
        for (let item of document.querySelectorAll("div.b-product-discount div.cause")) {
            if(["Неремонтопригодный","Неработоспособный","Механические повреждения"].includes(item.innerHTML)) {
                item.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
            }
        }
    }

    /**
     * Remove reserved items
     */
    static removeReserved() {
        for (let item of document.querySelectorAll("div.btn-group a.disabled")) {
            item.parentNode.parentNode.parentNode.remove();
        }
    }

    /**
     * Set filter params
     */
    setFilter() {
        setTimeout(function () {
            const ffCheck = document.querySelector('input[data-gtm-eventcontent="Функциональность"][data-gtm-eventcontext="полностью исправен"]');
            if (!ffCheck.checked) {
                ffCheck.click();
                document.querySelector("#showFilteredButton").click();
            }
        },333);
    }

    /**
     * Set sorting param
     */
    setSort() {
        setTimeout(function () {
            if (document.querySelector('div.form-inline ul.dropdown-menu li[data-original-index="0"]').className!=="selected") {
                document.querySelector('div.form-inline ul.dropdown-menu li[data-original-index="0"] a').click()
            }
        },333);

    }

    /**
     * Set view param
     */
    setView() {
        setTimeout(function () {
            if (document.getElementById("viewType0").className.indexOf("active") === -1) {
                document.getElementById("viewType0").click();
            }
        },333);
    }
}

new Ulmart();
