/*eslint no-new: 0*/

class Avito {
    constructor() {
        let path = window.location.pathname.split('/');

        if (path.includes('sdam')) {
            if (path.includes('komnaty') || path.includes('kvartiry')) {
                this.flatsFilter();
            }
        } else if (path.includes('kvartiry') && path.includes('prodam')) {
            this.badAgencyFilter();
        } else if (path.includes('tovary_dlya_kompyutera') && path.includes('klaviatury_i_myshi')) {
            this.keyboardFilter();
        } else if (path.includes('telefony')) {
            this.phoneFilter();
        } else if (path.includes('noutbuki')) {
            this.notebookFilter();
        } else if (path.includes('velosipedy_i_samokaty')) {
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
        let adverts = document.querySelectorAll('[itemtype="http://schema.org/Product"]');

        for (let advert of adverts) {
            let advertTitle = advert.querySelector('[data-marker="item-title"]').innerHTML.trim();
            for (let filter of filters) {
                if (advertTitle.search(filter) > -1) {
                    console.info(`"${advertTitle}" filtered out`)
                    advert.remove();
                    break;
                }
            }
        }
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
        const filters = [/запчаст/i, /разбор/i, /зап\.ч/i, /з\.ч\./i, /з\/ч/i, /на детали/i, /по частям/i];
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
