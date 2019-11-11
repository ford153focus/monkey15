function filter() {
    document.querySelectorAll('[data-qa="vacancy-serp__vacancy_rejected"]').forEach((link) => {
        if (link.href.search(/\d+$/) > -1) {
            link.parentNode.parentNode.parentNode.remove()
        }
    });

    document.querySelectorAll('[data-qa="vacancy-serp__vacancy_invited"]').forEach((link) => {
        if (link.href.search(/\d+$/) > -1) {
            link.parentNode.parentNode.parentNode.remove()
        }
    });

    document.querySelectorAll('[data-qa="vacancy-serp__vacancy_responded"]').forEach((link) => {
        if (link.href.search(/\d+$/) > -1) {
            link.parentNode.parentNode.parentNode.remove()
        }
    });
}

/*
document.querySelector('[name="search_period"]')
    .parentElement.parentElement
    .insertAdjacentHTML('afterEnd', `<div class="search-filters__item">
        <form>
            <a id="filterProccesed">Filter Proccesed</a>
        </form>
    </div>`);

document.getElementById('filterProccesed').onclick = filter
*/

filter();
