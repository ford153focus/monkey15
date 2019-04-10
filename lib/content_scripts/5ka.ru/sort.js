const DEBUG = true;

function getPricePerKg(item) {
    // get price
    let priceTxt = item.querySelector('.cost__current').getAttribute('data-price');
    let price = parseFloat(priceTxt);

    // get weight
    let title = item.querySelector('.product__title').innerText.trim();
    let weight = title.match(/(\d+\.?\,?\d*)\s*(г|кг|мл|л)/i);

    // return price if weight is not specified
    if (!weight) {
        if (DEBUG) {
            console.warn(title);
            console.warn(weight);
            console.warn(priceTxt);
        }
        return price;
    }

    let weightValue = parseFloat(weight[1].replace(',', '.'));
    let weightUnit = weight[2].toLowerCase();

    if (weightUnit !== 'кг' && weightUnit !== 'л') {
        weightValue /= 1000;
    }

    return price / weightValue;
}

function reSort() {
    let items = document.querySelectorAll('ul.catalog__list.row li.catalog__item');

    [...items]
        .sort((item1, item2) => {
            return getPricePerKg(item1) - getPricePerKg(item2);
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

var loadMoreInterval = setInterval(function() {
    let loadMoreButton = document.querySelector('.btn__show_more');
    if (loadMoreButton.classList.contains('btn-disable')) {
        clearInterval(loadMoreInterval);
    }
    loadMoreButton.click();
    reSort();
}, 4444);
