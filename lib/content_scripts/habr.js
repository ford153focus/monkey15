/**
 * UNFINISHED
 */

let table = document.createElement('table');
table.id = "fav_table";

document.querySelectorAll('li[id^="post_"]').forEach(function(el){
    let row = document.createElement('tr');

    row.appendChild(Object.assign(document.createElement('td'), {
        innerHTML: el.querySelector('[title="Автор публикации"]').outerHTML
    }))

    row.appendChild(Object.assign(document.createElement('td'), {
        innerHTML: el.querySelector('span.post__time').outerHTML
    }))

    row.appendChild(Object.assign(document.createElement('td'), {
        innerHTML: el.querySelector('h2.post__title a').outerHTML
    }))

    row.appendChild(Object.assign(document.createElement('td'), {
        innerHTML: Array.prototype.concat.call(
            Array.prototype.slice.call(el.querySelectorAll('ul.post__hubs li')), 
            Array.prototype.slice.call(el.querySelectorAll('ul.post__marks li'))
        )
    }))

    table.appendChild(row);
})

let list = document.querySelector('.user_favorites');
list.insertBefore(table, list.firstChild);
