function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) {
        true;
    }
}

document.querySelector('h3.b-subtitle.b-employerpage-vacancies-title').innerHTML += `
    <a id="expandAll">Expand All</a>
    <a id="filterSpb">Spb only</a>
`;

document.getElementById('expandAll').onclick = () => {
    document.querySelectorAll('.company-vacancies:not(.g-expand)').forEach((notExpanded) => {
        notExpanded.querySelectorAll('h4 span.bloko-link-switch').forEach((el) => {
            el.click();
            sleep(50);
        });
    });

    sleep(150);

    document.querySelectorAll('div.company-vacancies-group__title span.bloko-link-switch').forEach((el) => {
        el.click();
        sleep(50);
    });
};

document.getElementById('filterSpb').onclick = () => {
    document.querySelectorAll('.b-vacancy-list-address').forEach((el) => {
        if (el.innerText.search('Санкт-Петербург') === -1) {
            el.parentNode.parentNode.remove()
        }
    });
};
