/*eslint no-new: 0*/

class Avito {
    constructor() {
        if (window.location.pathname.search(/^\/[a-z_\-]+\/kvartiry\/sdam/) > -1 ||
            window.location.pathname.search(/^\/[a-z_\-]+\/komnaty\/sdam/) > -1) {
            this.flatsFilter();
        } else if (window.location.pathname.search(/^\/[a-z_\-]+\/kvartiry\/prodam/) > -1) {
            this.badAgencyFilter();
        } else if (window.location.pathname.search(/^\/[a-z_\-]+\/tovary_dlya_kompyutera\/klaviatury_i_myshi/) > -1) {
            this.keyboardFilter();
        } else if (window.location.pathname.search(/^\/[a-z_\-]+\/telefony/) > -1) {
            this.phoneFilter();
        } else if (window.location.pathname.search(/^\/[a-z_\-]+\/noutbuki/) > -1) {
            this.notebookFilter();
        } else if (window.location.pathname.includes('velosipedy_i_samokaty')) {
            this.scooterFilter();
        }
    }

    hideThisAdvert(advert) {
        if (advert.id.search(/^i\d+$/) === 0) {
            advert.remove();
        } else {
            this.hideThisAdvert(advert.parentNode);
        }
    }

    filterByTitle(filters) {
        const adverts = document.querySelectorAll('.item_table.item');

        adverts.forEach((advert) => {
            const advertTitle = advert.innerHTML.trim();
            filters.forEach((filter) => {
                if (advertTitle.search(filter) > -1) {
                    this.hideThisAdvert(advert);
                }
            });
        });
    }

    flatsFilter() {
        // noinspection MagicNumberJS
        const maxAllowedDistance = 2.0;
        // noinspection MagicNumberJS
        const maxAllowedCommission = 999;

        document.querySelectorAll('.item .about__commission').forEach((item) => {
            let commission = parseInt(item.innerHTML);
            if (!isNaN(commission) && commission > maxAllowedCommission) {
                this.hideThisAdvert(item);
            }
        });

        document.querySelectorAll('p.address span.c-2').forEach((distanceToMetro) => {
            let distanceToMetroTxt = distanceToMetro.innerHTML;
            if (distanceToMetroTxt.includes('км') && parseFloat(distanceToMetroTxt) > maxAllowedDistance) {
                this.hideThisAdvert(distanceToMetro);
            }
        });
    }

    badAgencyFilter() {
        let badPaths = ['/ecdg', '/kupikvartirky'];

        document.querySelectorAll('.snippet-line-row .snippet-link').forEach((sellerPageLink) => {
            let urlObj = new URL(sellerPageLink.href);

            if (badPaths.includes(urlObj.pathname)) {
                this.hideThisAdvert(sellerPageLink);
            }
        });
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

    scooterFilter() {
        const filters = [/гироскутер/i];
        this.filterByTitle(filters);
    }
}

// noinspection ObjectAllocationIgnored
new Avito();
