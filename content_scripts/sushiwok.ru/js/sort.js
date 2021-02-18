let items = document.querySelectorAll('div.card-wrapper--grid');

[...items]
    .sort((item1, item2) => {
        let weight1 = parseInt(item1.querySelector('span.card__ingredients span').innerText.trim());
        let weight2 = parseInt(item2.querySelector('span.card__ingredients span').innerText.trim());

        let price1 = parseInt(item1.querySelector('span.card__price__current--is-action').innerText.trim());
        let price2 = parseInt(item2.querySelector('span.card__price__current--is-action').innerText.trim());

        return price1 / weight1 - price2 / weight2;
    })
    .map((item) => {
        items[0].parentElement.appendChild(item);
    });
