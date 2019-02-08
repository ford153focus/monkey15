document.querySelector('h3.b-subtitle.b-employerpage-vacancies-title').innerHTML += `
    &nbsp;&nbsp;&nbsp;
    <a id="expandAll">Expand All</a>
    &nbsp;&nbsp;&nbsp;
    <a id="filterSpb">Spb only</a>`;

document.getElementById('expandAll').onclick = function() {
    function sleep(ms) {
        ms += new Date().getTime();
        while (new Date() < ms) {
            true;
        }
    }

    document.querySelectorAll('a.bloko-link-switch[data-toggle="Nested"]').forEach((el) => {
        el.click();
        sleep(50);
    });
}

document.getElementById('filterSpb').onclick = function() {
    document.querySelectorAll('.b-vacancy-list-address').forEach((el) => {
        if (el.innerText.search('Санкт-Петербург') === -1) {
            el.parentNode.parentNode.remove()
        }
    });
}
