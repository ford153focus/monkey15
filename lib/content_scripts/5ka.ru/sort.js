const DEBUG = false;
const itemsSelector = 'ul.catalog__list.row li.catalog__item';

function getPrice(item) {
    let priceTxt = item.querySelector('.cost__current').getAttribute('data-price');
    return parseFloat(priceTxt);
}

function getWeight(item) {
    let title = item.querySelector('.product__title').innerText.trim();
    let weight = title.match(/(\d+\.?,?\d*)(г|кг|мл|л|шт)?/i);

    // return price if weight is not specified
    if (!weight) {
        if (DEBUG) {
            console.warn(title);
            console.warn(weight);
        }
        return 1;
    }

    let weightValue = parseFloat(weight[1].replace(',', '.'));
    let weightUnit = weight[2] ? weight[2].toLowerCase() : 'г';

    let kiloUnits = ['l', 'кг', 'л', 'шт'];

    if (!kiloUnits.includes(weightUnit)) {
        weightValue /= 1000;
    }

    return weightValue;
}

/**
 * Main sorter
 */
function reSort() {
    console.log('Sorting...');

    let items = document.querySelectorAll(itemsSelector);

    [...items]
        .sort((item1, item2) => {
            return getPrice(item1) / getWeight(item1) - getPrice(item2) / getWeight(item2);
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

if (document.querySelector('.sort__value.sort__value_order .select__value').innerText !== 'Цена') {
    document.querySelector('a.select__drop_link[data-value="special_price"]').click()
}

if (document.querySelector('.sort__value.sort__value_count .select__value').innerText !== '60') {
    document.querySelector('.sort__value.sort__value_count a.select__drop_link[data-value="60"]').click()
}

const loadMoreInterval = setInterval(() => {
    console.log('Loading...');

    let loadMoreButton = document.querySelector('.btn__show_more');

    let lastItemPrice = parseFloat(
        document.querySelector('.catalog__item:last-child .cost__current ')
            .getAttribute('data-price').replace(',', '.')
    );

    if (loadMoreButton.classList.contains('btn-disable') || lastItemPrice > 987) {
        console.log('catalog end reached');
        clearInterval(loadMoreInterval);
        reSort();
        return;
    }

    loadMoreButton.click();
}, 1530);
