const DEBUG = false;

function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}

function getPrice(item) {
    console.log(item);
    let priceTxt = item.querySelector('.products__item-current-price .price-val');
    if (priceTxt === null) {
        return Number.MAX_SAFE_INTEGER;
    }
    let price = parseFloat(priceTxt.innerText);
    return price;
}

function getWeight(item) {
    let title = item.querySelector('.products__item-title a').innerText.trim();
    let weight = title.match(/(\d+\.?\,?\d*)(г|кг|мл|л|шт)?/i);

    // return price if weight is not specified
    if (!weight) {
        if (DEBUG) {
            console.warn(title);
            console.warn(weight);
            console.warn(priceTxt);
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

    let items = document.querySelectorAll('.products__list article.products__item');

    [...items]
        .sort((item1, item2) => {
            return getPrice(item1)/getWeight(item1) - getPrice(item2)/getWeight(item2);
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

setTimeout(() => {
    triggerMouseEvent(document.querySelector('.products-toolbar__sort .select2-selection'), 'mousedown');
    triggerMouseEvent(document.querySelector('#select2-criterion-results li[id$="-price-asc"]'), 'mouseup');
}, 1234);

setTimeout(() => {
    reSort();
}, 6789);
