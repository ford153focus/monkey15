setTimeout(() => {
    let script = document.createElement('script');
    script.src = chrome.runtime.getURL('/web_accessible_resources/auchan.ru/script.js');
    document.head.appendChild(script);

    fetch(chrome.runtime.getURL('/web_accessible_resources/auchan.ru/filtersBar.html'))
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            document.querySelector('div.css-xyee89').insertAdjacentHTML('afterbegin', data);
        })
        .catch((err) => {
            console.log(err);
        });
}, 5310);
