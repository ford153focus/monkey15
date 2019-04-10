function sort() {
    let items = document.querySelectorAll('#dispatch-tbody > tr');

    [...items]
        .sort((item1, item2) => {
            let s1 = parseFloat(item1.querySelector('td[data-l10n-id="size-MB"]').innerText);
            let s2 = parseFloat(item2.querySelector('td[data-l10n-id="size-MB"]').innerText);
            return s2 - s1;
        })
        .map((item) => {
            items[0].parentElement.appendChild(item);
        });
}

setInterval(sort, 153);
