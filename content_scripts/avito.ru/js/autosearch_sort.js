items = document.querySelectorAll('[data-marker="favorite-search"]');

[...items]
    .sort((item1, item2) => {
        let cat1 = item1.querySelector('[data-marker="favorite-search/title"] a').innerText;
        let title1 = item1.querySelector('[data-marker="favorite-search/title"]').innerText;

        let cat2 = item2.querySelector('[data-marker="favorite-search/title"] a').innerText;
        let title2 = item2.querySelector('[data-marker="favorite-search/title"]').innerText;

        return cat1===cat2 ? title1.localeCompare(title2) : cat1.localeCompare(cat2);
    })
    .map((item) => {
        items[0].parentElement.appendChild(item);
    });
