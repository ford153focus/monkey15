const DEBUG = true;

/**
 * Get item price
 * @param {HTMLElement} item Item
 * @returns {number} Price
 */
function getPrice(item) {
    try {
        let priceElem = item.querySelector('.xf-product-cost');
        let priceTxt = priceElem.innerText.match(/^\d+,\d/)[0].replace(',', '.');
        // noinspection UnnecessaryLocalVariableJS
        let price = parseFloat(priceTxt);

        return price;
    } catch (error) {
        console.error(item.querySelector('.xf-product-title').innerText);
        console.error(error);
        return Number.MAX_SAFE_INTEGER;
    }
}

/**
 * Get item weight
 * @param {HTMLElement} item Item
 * @returns {number} Weight
 */
function getWeight(item) {
    let weightKg = item.querySelector('.xf-product-title').innerText.match(/([\d.]+)(кг|л)/);
    let weightGr = item.querySelector('.xf-product-title').innerText.match(/([\d.]+)(г|мл)/);
    let weight = 1;

    if (weightKg !== null) {
        weight = parseInt(weightKg[1]);
    } else if (weightGr !== null) {
        weight = parseInt(weightGr[1]) / 1000
    }

    if (weightKg === null && weightGr === null) {
        if (DEBUG) {
            console.warn(item.querySelector('.xf-product-title').innerText);
        }
    }

    return weight;
}

/**
 * Get item price per 1 kg
 * @param {HTMLElement} item Item
 * @returns {number} Price
 */
function getPricePerKg(item) {
    if (item.querySelector('.xf-price__unit') !== null &&
        item.querySelector('.xf-price__unit').innerText.search(/кг$/) > -1) {
        return getPrice(item);
    } else {
        let weight = getWeight(item);
        let price = getPrice(item);
        return price / weight;
    }
}

/**
 * Sorter
 */
function sort() {
    let items = document.querySelectorAll('#catalogItems > li');

    [...items]
        .sort((item1, item2) => {
            return getPricePerKg(item1) - getPricePerKg(item2);
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

/**
 * Resort items after load
 */
document.querySelector('.xf-paginator__more').onclick = function() {
    setTimeout(function() {
        sort();
    }, 4321)
};

/**
 * Initial sort
 */
sort();

/**
 * Load more automatically
 */
const loaderIntervalHandler = setInterval(function() {
    document.querySelector('.xf-paginator__more').click();

    let items = document.querySelectorAll('#catalogItems > li');
    let lastItem = items[items.length - 1];

    /**
     * stop on not available items
     */
    if (lastItem.querySelector('.xf-product-cost') === null) {
        clearInterval(loaderIntervalHandler);
    }

    /**
     * stop on dear items
     */
    if (getPrice(lastItem) > 333) {
        clearInterval(loaderIntervalHandler);
    }
}, 1234);
