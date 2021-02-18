let output = '';

for (const item of document.querySelectorAll('.shopping-list__sku-card')) {
    output += item.querySelector('.sku-card-shopping-list__title').innerText +
        ' || ' +
        item.querySelector('.sku-card-shopping-list__sub-title').innerText +
        ' || ' +
        item.querySelector('.price__primary').innerText +
        '\n';
}

console.log(output);
