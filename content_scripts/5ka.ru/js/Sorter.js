class Sorter {
    constructor() {
        this.parameterSetter();

        const loadMoreInterval = setInterval(() => {
            console.info('Loading...');

            if (!this.canLoadMore() || this.getLastItemPrice() > 555) {
                console.log('catalog end reached');
                clearInterval(loadMoreInterval);
                this.reSort();
                return;
            }

            this.loadMoreButton.click();
        }, 1530);
    }

    /**
     * Check if we can load more items
     * @abstract
     * @returns {boolean} Possibility flag
     */
    canLoadMore() {
        return !this.loadMoreButton.classList.contains('btn-disable');
    }

    getLastItemPrice() {
        let items = document.querySelectorAll(this.itemsSelector);
        let lastItem = [...items].pop();
        let lastItemPrice = this.getPrice(this.getRawPriceTxt(lastItem));

        return lastItemPrice;
    }

    /**
     * @abstract
     * @param {Element} item HTML-tag of product
     * @returns {string} String contains price
     */
    getRawPriceTxt(item) {
        return item.querySelector('.cost__current').getAttribute('data-price');
    }

    getPrice(txt) {
        txt = txt.trim().replace(',', '.');
        return parseFloat(txt);
    }

    /**
     * @abstract
     * @param {Element} item HTML-tag of product
     * @returns {string} String contains weight
     */
    getRawWeightTxt(item) {
        return item.querySelector('.product__title').innerText;
    }

    getWeight(txt) {
        let weight = txt.trim().match(/(\d+\.?,?\d*)(г|кг|мл|л|шт)?/i);

        if (!weight) return 1;

        let weightValue = parseFloat(weight[1].replace(',', '.'));
        let weightUnit = weight[2] ? weight[2].toLowerCase() : 'г';

        let kiloUnits = ['l', 'кг', 'л', 'шт'];

        if (!kiloUnits.includes(weightUnit)) {
            weightValue /= 1000;
        }

        return weightValue;
    }

    reSort() {
        console.info('Sorting...');

        let items = document.querySelectorAll(this.itemsSelector);

        [...items]
            .sort((item1, item2) => {
                let ratio1 = this.getPrice(this.getRawPriceTxt(item1)) / this.getWeight(this.getRawWeightTxt(item1));
                let ratio2 = this.getPrice(this.getRawPriceTxt(item2)) / this.getWeight(this.getRawWeightTxt(item2));
                return ratio1 - ratio2;
            })
            .map(item => items[0].parentElement.appendChild(item));
    }

    /**
     * @abstract
     */
    parameterSetter() {
        this.DEBUG = false;
        this.itemsSelector = 'ul.catalog__list.row li.catalog__item';
        this.loadMoreButton = document.querySelector('.btn__show_more');

        let orderSelector = document.querySelector('.sort__value.sort__value_order .select__value');
        if (orderSelector.innerText !== 'Цена') orderSelector.click();

        let itemsCountSelector = document.querySelector('.sort__value.sort__value_count .select__value');
        if (itemsCountSelector.innerText !== '60') itemsCountSelector.click();
    }
}
