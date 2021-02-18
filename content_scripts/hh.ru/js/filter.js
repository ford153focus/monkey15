// eslint-disable-next-line no-unused-vars
function filter() {
    let vacancies = new Set([
        ...document.querySelectorAll('[data-qa="vacancy-serp__vacancy_rejected"]'),
        ...document.querySelectorAll('[data-qa="vacancy-serp__vacancy_invited"]'),
        ...document.querySelectorAll('[data-qa="vacancy-serp__vacancy_responded"]')
    ]);

    for (const vacancy of vacancies) {
        if (vacancy.href.search(/\d+$/) > -1) {
            vacancy.parentNode.parentNode.parentNode.remove()
        }
    }
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

// filter();
