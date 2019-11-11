/*eslint no-new: 0*/

class Avito {
    constructor() {
        if (window.location.pathname.search(/^\/[a-z\-]+\/kvartiry\/sdam/) > -1 ||
            window.location.pathname.search(/^\/[a-z\-]+\/komnaty\/sdam/) > -1) {
            this.flatsFilter();
        } else if (window.location.pathname.search(/^\/[a-z\-]+\/tovary_dlya_kompyutera\/klaviatury_i_myshi/) > -1) {
            this.keyboardFilter();
        } else if (window.location.pathname.search(/^\/[a-z\-]+\/telefony/) > -1) {
            this.phoneFilter();
        } else if (window.location.pathname.search(/^\/[a-z\-]+\/noutbuki/) > -1) {
            this.notebookFilter();
        }

        setTimeout(() => {
            document.querySelectorAll('.avito-ads-container').forEach((ad) => {
                ad.style.display = 'None';
            });
            document.querySelector('.catalog-promo').style.display = 'None';
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
        const adverts = document.querySelectorAll('.item .title.item-description-title .item-description-title-link');

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

// noinspection ObjectAllocationIgnored
new Avito();
