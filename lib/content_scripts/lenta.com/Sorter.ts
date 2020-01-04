class Sorter {
    DEBUG: boolean = false;
    loadMoreInterval: any;

    loadMoreButtonSelector: string = '.catalog__pagination button';
    itemPriceSelector: string = 'dd.price__primary';
    itemWeightSelector: string = '.sku-card-small__sub-title';
    itemsSelector: string = '.catalog__grid .sku-card-small';

    switchSorting(): void {
        let switcher: HTMLElement = document.querySelector('.catalog__sorting-dropdown .dropdown__label');
        let targetButton: HTMLElement = document.querySelector('a[data-value="ByPriceAsc"]');

        if (switcher.innerText !== 'Сначала дешевые') {
            targetButton.click();
            setTimeout(() => { window.location.reload(); }, 333);
        }
    }

    loadMore(): void {
        console.log('Loading...');

        let loadMoreButton: HTMLElement = document.querySelector(this.loadMoreButtonSelector);

        let catalogItems: NodeListOf<HTMLElement> = document.querySelectorAll(this.itemsSelector);
        let lastItemPrice: number = this.getPrice([...catalogItems].slice(-1)[0]);

        if (loadMoreButton === null || lastItemPrice > 987) {
            console.log('catalog end reached');
            clearInterval(this.loadMoreInterval);
            reSort();
            return;
        }

        loadMoreButton.click();
    }

    getPrice(item: HTMLElement): number {
        let priceElmnt: HTMLElement = item.querySelector(this.itemPriceSelector);
        let priceTxt: string = priceElmnt.innerText.replace(',', '.').replace(/\D/g, '');
        let price: number = parseFloat(priceTxt);

        return price;
    }

    getWeight(item: HTMLElement): number {
        let weightElmnt: HTMLElement = item.querySelector(this.itemWeightSelector);
        let weightTxt: string = weightElmnt.innerText;
        let weight = weightTxt.match(/(\d+\.?,?\d*)\s*(L|г|кг|л|мл|уп|шт)?/i);
        if (!weight) { return 1; } 

        let weightValue = parseFloat(weight[1].replace(',', '.'));
        let weightUnit = weight[2] ? weight[2].toLowerCase() : 'г';

        let kiloUnits = ['l', 'кг', 'л', 'уп', 'шт'];

        if (!kiloUnits.includes(weightUnit)) {
            weightValue /= 1000;
        }

        return weightValue;
    }

    reSort(): void {
        console.log('Sorting...');
        let timer = performance.now();

        let items: NodeListOf<HTMLElement> = document.querySelectorAll(this.itemsSelector);

        [...items]
            .sort((item1, item2) => {
                return this.getPrice(item1) / this.getWeight(item1) - this.getPrice(item2) / this.getWeight(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });

        console.log(`Sorted in ${((performance.now() - timer) / 1000).toFixed(3)} seconds`);
    }

    constructor() {
        this.switchSorting();
        this.loadMoreInterval = setInterval(() => { this.loadMore() }, 1530);
    }
}

new Sorter();
