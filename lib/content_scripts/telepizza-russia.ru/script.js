setTimeout(() => {
    document.querySelector('div.filters.tooltipster-block').insertAdjacentHTML(
        'beforeend',
        '<div class="button tooltipster-button" id="filter-all-big">All big</div>'
    );


    document.getElementById('filter-all-big').addEventListener('click', function () {
        document.querySelectorAll('div[name="size"]').forEach((size) => {
            console.log(size.querySelector('button:last-of-type').click())
        })
    });
}, 4444);
