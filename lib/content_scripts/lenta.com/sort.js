const DEBUG = false;
let minPrice = Number.MIN_SAFE_INTEGER;

function getPricePerKg(item) {
    // get price
    let priceTxt = item.querySelector('dd.price__primary').innerText.replace(',', '.');
    let price = parseFloat(priceTxt);

    minPrice = price>minPrice ? price : minPrice;

    // get weight
    let weightTxt = item.querySelector('.sku-card-small__sub-title').innerText;
    let weight = weightTxt.match(/(\d+\.?\,?\d*)\s*(L|г|кг|мл|л|шт)?/i);

    // return price if weight is not specified
    if (!weight) {
        if (DEBUG) {
            console.log(item.querySelector('.sku-card-small__title').innerText);
            console.log(weightTxt);
            console.log(priceTxt);
        }
        return price;
    }

    let weightValue = parseFloat(weight[1].replace(',', '.'));
    let weightUnit = weight[2] ? weight[2].toLowerCase() : 'г';

    let kiloUnits = ['l', 'кг', 'л', 'шт'];
    
    if (kiloUnits.indexOf(weightUnit) === -1) {
        weightValue /= 1000;
    }

    return price / weightValue;
}

/**
 * Main sorter
 */
function reSort() {
    console.log('Sorting...');

    let items = document.querySelectorAll('.catalog__grid .sku-card-small');

    [...items]
        .sort((item1, item2) => {
            return getPricePerKg(item1) - getPricePerKg(item2);
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

if (document.querySelector('.catalog__sorting-block .dropdown__label').innerText !== 'Сначала дешевые') {
    document.querySelector('a[data-value="ByPriceAsc"]').click();
}

var loadMoreInterval = setInterval(function() {
    console.log('Loading...');

    let loadMoreButton = document.querySelector('.catalog__pagination button');
    let lastItemPrice = parseFloat(
        document.querySelector('.catalog__grid .sku-card-small:last-child dd.price__primary')
            .innerText.replace(',', '.')
    );
    
    if (loadMoreButton === null || lastItemPrice > 987) {
        console.log('catalog end reached');
        clearInterval(loadMoreInterval);
        reSort();
        // reSort2();
        return;
    }

    loadMoreButton.click();
}, 1530);
