class Ulmart {
    constructor() {
        try { this.setFilter(); } catch (e) { console.debug(e); }
        try { this.setView(); } catch (e) { console.debug(e); }
        try { this.setSort(); } catch (e) { console.debug(e); }

        setInterval(function() {
            try { this.removeReserved(); } catch (e) { console.debug(e); }
            try { this.removeBroken(); } catch (e) { console.debug(e); }
            try { this.loadMore(); } catch (e) { console.debug(e); }
            // try { this.manualSort(); } catch (e) { console.debug(e); }
            // try { this.sortRecheck(); } catch (e) { console.debug(e); }
        }.bind(this), 4444);
    }

    /**
     * Load more
     */
    loadMore() {
        const btnMore = document.querySelector("span.btn-product-more");
        if (btnMore !== null && btnMore.className.includes("g-hidden") === false) {
            btnMore.click();
        }
    }

    /**
     * Remove out-of-order items
     */
    removeBroken() {
        for (let item of document.querySelectorAll("div.b-product-discount div.cause")) {
            if(["Неремонтопригодный","Неработоспособный","Механические повреждения"].includes(item.innerHTML)) {
                item.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
            }
        }
    }

    /**
     * Remove reserved items
     */
    removeReserved() {
        for (let item of document.querySelectorAll("div.btn-group a.disabled")) {
            item.parentNode.parentNode.parentNode.remove();
        }
    }


    setFilter() {
        setTimeout(function () {
            const ffCheck = document.querySelector('input[data-gtm-eventcontent="Функциональность"][data-gtm-eventcontext="полностью исправен"]');
            if (!ffCheck.checked) {
                ffCheck.click();
                document.querySelector("#showFilteredButton").click();
            }
        },333);
    }

    setSort() {
        setTimeout(function () {
            if (document.querySelector('div.form-inline ul.dropdown-menu li[data-original-index="0"]').className!=="selected") {
                document.querySelector('div.form-inline ul.dropdown-menu li[data-original-index="0"] a').click()
            }
        },333);

    }

    setView() {
        setTimeout(function () {
            if (document.getElementById("viewType0").className.indexOf("active") === -1) {
                document.getElementById("viewType0").click();
            }
        },333);
    }

    manualSort() {
        let items = document.querySelectorAll("section.b-product");

        for (let i = 0; i < items.length - 1; i++) {
            for (let j = 0; j < items.length - 1; j++) {
                let aPrice =  parseInt(items[i].querySelector("span.b-price span").innerHTML.replace('&nbsp;',''));
                let bPrice =  parseInt(items[j].querySelector("span.b-price span").innerHTML.replace('&nbsp;',''));
                if (bPrice < aPrice) {
                    items[i].parentNode.insertBefore(items[j], items[i]); //swap
                    items = document.querySelectorAll("section.b-product"); //update articles order
                }
            }
        }
    }

    sortRecheck() {
        let items = [...document.querySelectorAll("section.b-product")];

        let itemsSorted = items.slice(0).sort(function(a,b){
            let aPrice =  parseInt(a.querySelector("span.b-price span").innerHTML.replace('&nbsp;',''));
            let bPrice =  parseInt(b.querySelector("span.b-price span").innerHTML.replace('&nbsp;',''));
            return (aPrice-bPrice);
        });

        if (items !== itemsSorted) {
            setTimeout(function(){ document.querySelector('div.form-inline ul.dropdown-menu li[data-original-index="7"] a').click(); }, 2000);
            setTimeout(function(){ document.querySelector('div.form-inline ul.dropdown-menu li[data-original-index="0"] a').click(); }, 2000);
        }
    }
}

new Ulmart();
