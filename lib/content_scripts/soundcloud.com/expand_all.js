// add link
document.querySelector('a.g-tabs-link.active').insertAdjacentHTML('afterend', '<a id="expand-all">expand all</a>');

// style
document.querySelector('a#expand-all').style.cursor = 'pointer';

// on-click event
document.querySelector('a#expand-all').onclick = () => {
    [...document.getElementsByTagName('a')]
        .filter((link) => {
            return (/View \d+ tracks/).test(link.innerText)
        }).forEach((link) => {
            link.click()
        })
};
