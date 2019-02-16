const DEBUG = true;

function getPricePerKg(item) {
    // get price
    let priceElem = item.querySelector('span.price_block__cur-price');
    let priceTxt  = priceElem.innerText.replace(/^от\s/i, '');
    let price     = parseFloat(priceTxt);

    // get weight
    let weightInTitle = item.querySelector('.goods__title').innerText.match(/(\d+\.?\,?\d*)\s(г|кг|мл|л)/i);
    let weightInDesc  = item.querySelector('.catalog__item__text').innerText.match(/(\d+\.?\,?\d*)\s(г|кг|мл|л)/i);
    let weight = !weightInTitle ? weightInDesc : weightInTitle;

    // return price if weight is not specified
    if (!weight) {
        if (DEBUG) {
            console.warn(item.querySelector('.goods__title').innerText);
            console.warn(item.querySelector('.catalog__item__text').innerText);
            console.warn(weight);
            console.warn(price);
        }
        return price;
    }

    let weightValue = parseFloat(weight[1].replace(',', '.'));
    let weightUnit = weight[2].toLowerCase();

    if (weightUnit !== 'кг' && weightUnit !== 'л') {
        weightValue /= 1000;
    }

    return price/weightValue;
}

let items = document.querySelectorAll('div.catalog__item[id^="catalogItemBlock"]');

[...items]
    .sort((item1, item2) => {
        return getPricePerKg(item1)-getPricePerKg(item2);
    })
    .map((item) => {
        items[0].parentElement.appendChild(item);
    });

// remove items with specified discount instead price
[...items]
    .map((item) => {
        if (item.querySelector('span.price_block__cur-price').innerText.replace(' ', '').search(/\-\d+\%/) > -1) {
            item.remove();
        }
    });
