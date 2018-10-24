class Avito {
    constructor() {
        if (window.location.pathname.search(/^\/[a-z\-]+\/kvartiry\/sdam/) > -1 || window.location.pathname.search(/^\/[a-z\-]+\/komnaty\/sdam/) > -1) {
            this.flatsFilter();
        } else if (window.location.pathname.search(/^\/[a-z\-]+\/tovary_dlya_kompyutera\/klaviatury_i_myshi/) > -1) {
            this.keyboardFilter();
        } else if (window.location.pathname.search(/^\/[a-z\-]+\/telefony/) > -1) {
            this.phoneFilter();
        } else if (window.location.pathname.search(/^\/[a-z\-]+\/noutbuki/) > -1) {
            this.notebookFilter();
        }
        setTimeout(() => {
            [...document.querySelectorAll(".avito-ads-container")].map(ad => {
                // noinspection JSUnresolvedVariable
                ad.style.display = "None";
            });
            document.querySelector(".catalog-promo").style.display = "None";
        }, 333);
    }

    hideThisAdvert(advert) {
        if (advert.id.search(/^i\d+$/) === 0) {
            advert.remove();
        } else {
            this.hideThisAdvert(advert.parentNode);
        }
    }

    filterByTitle(filters) {
        const adverts = document.querySelectorAll(".item .title.item-description-title .item-description-title-link");

        adverts.forEach(function (advert) {
            const advert_title = advert.innerHTML.trim();
            filters.forEach(function (filter) {
                if (advert_title.search(filter) > -1) {
                    // noinspection JSPotentiallyInvalidUsageOfClassThis
                    this.hideThisAdvert(advert);
                }
            }.bind(this));
        }.bind(this));
    }

    flatsFilter() {
        const max_allowed_distance = 2.0;
        const max_allowed_commission = 999;

        document.querySelectorAll(".item .about__commission").forEach(function (item) {
            let commission = parseInt(item.innerHTML);
            if (!isNaN(commission) && (commission > max_allowed_commission)) {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.hideThisAdvert(item);
            }
        }.bind(this));

        document.querySelectorAll("p.address span.c-2").forEach(function (distance_to_metro) {
            let distance_to_metro_txt = distance_to_metro.innerHTML;
            if (distance_to_metro_txt.includes("км") && parseFloat(distance_to_metro_txt) > max_allowed_distance) {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.hideThisAdvert(distance_to_metro);
            }
        }.bind(this));
    }

    keyboardFilter() {
        const filters = [/^Наклейка для/i, /^Клавиатур([аы])( для)? (нетбук(а|ов)|ноутбук(а|ов))/i];
        this.filterByTitle(filters);
    }

    notebookFilter() {
        const filters = [/запчаст/i, /разбор/i, /зап\.ч/i, /з\.ч\./i, /з\/ч/i, /на детали/i];
        this.filterByTitle(filters);
    }

    phoneFilter() {
        const filters = [/^чехол/i, /запчаст/i, /разбор/i, /зап\.ч/i, /з\.ч\./i, /з\/ч/i, /на детали/i];
        this.filterByTitle(filters);
    }
}

new Avito();
