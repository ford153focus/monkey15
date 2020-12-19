const DEBUG = false;

function getPricePerKg(item) {
    // get price
    let priceTxt = item.querySelector('dd.price__primary').innerText.replace(',', '.').replace(/\D/g, '');
    let price = parseFloat(priceTxt);

    // get weight
    let weightTxt = item.querySelector('.sku-card-small__sub-title').innerText;
    let weight = weightTxt.match(/(\d+\.?,?\d*)\s*(L|г|кг|л|мл|уп|шт)?/i);

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

    let kiloUnits = ['l', 'кг', 'л', 'уп', 'шт'];

    if (!kiloUnits.includes(weightUnit)) {
        weightValue /= 1000;
    }

    return price / weightValue;
}

/**
 * Main sorter
 */
function reSort() {
    console.log('Sorting...');
    let timer = performance.now();

    let items = document.querySelectorAll('.catalog__grid .sku-card-small');

    [...items]
        .sort((item1, item2) => {
            return getPricePerKg(item1) - getPricePerKg(item2);
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });

    console.log(`Sorted in ${((performance.now() - timer) / 1000).toFixed(3)} seconds`);
}

// eslint-disable-next-line no-unused-vars
let dropdownWaiter = new Promise((resolve, reject) => {
    let waitSelectorInterval = setInterval(() => {
        if (document.querySelector('.catalog__sorting-dropdown .dropdown__label') !== null) {
            clearInterval(waitSelectorInterval);
            // переведёт промис в состояние fulfilled с результатом "result"
            resolve(true);
        }
    }, 153);
});

dropdownWaiter
    .then(
        /**
         * первая функция-обработчик - запустится при вызове resolve
         * @param {any} result - аргумент resolve
         */
        // eslint-disable-next-line no-unused-vars
        (result) => {
            if (!document.location.href.includes('https://lenta.com/search/?searchText=')) {
                if (document.querySelector('.catalog__sorting-dropdown .dropdown__label').innerText !== 'Сначала дешевые') {
                    document.querySelector('a[data-value="ByPriceAsc"]').click();
                    setTimeout(() => {
                        window.location.reload();
                    }, 333);
                }
            }
        },
        /**
         * вторая функция - запустится при вызове reject
         * @param {any} error - аргумент reject
         */
        (error) => {
            console.error(error);
        }
    );

const loadMoreInterval = setInterval(() => {
    console.log('Loading...');

    let loadMoreButton = document.querySelector('.catalog__pagination button');

    let lastItemPrice = document.querySelector('.catalog__grid .sku-card-small:last-child dd.price__primary');
    lastItemPrice = lastItemPrice.innerText.replace(',', '.');
    lastItemPrice = parseFloat(lastItemPrice);

    if (loadMoreButton === null || lastItemPrice > 987) {
        console.log('catalog end reached');
        clearInterval(loadMoreInterval);
        reSort();
        return;
    }

    loadMoreButton.click();
}, 1530);
