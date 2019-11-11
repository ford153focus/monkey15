class Habr {
    static grabTags(el) {
        let tags = Array.prototype.concat.call(
            Array.prototype.slice.call(el.querySelectorAll('ul.post__hubs li')),
            Array.prototype.slice.call(el.querySelectorAll('ul.post__marks li'))
        );

        let tagsOuterHtml = '';

        tags.forEach((tag) => {
            tagsOuterHtml += tag.outerHTML;
        });

        return '<ul>' + tagsOuterHtml + '</ul>';
    }

    static parseDate(txt) {
        txt = txt
            .replace(' в ', ' ');

        txt = txt
            .replace('января', 'Jan')
            .replace('февраля', 'Feb')
            .replace('марта', 'Mar')
            .replace('апреля', 'Apr')
            .replace('мая', 'May')
            .replace('июня', 'Jun')
            .replace('июля', 'Jul')
            .replace('августа', 'Aug')
            .replace('сентября', 'Sep')
            .replace('октября', 'Oct')
            .replace('ноября', 'Nov')
            .replace('декабря', 'Dec');

        let date = new window.Date(txt);

        return `<span>
                ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
                <br>
                ${date.getHours()}:0${date.getMinutes().slice(-2)}:0${date.getSeconds().slice(-2)}
                </span>`
    }
}

let table = document.createElement('table');
table.id = 'fav_table';

document.querySelectorAll('li[id^="post_"]').forEach((el) => {
    let row = document.createElement('tr');

    row.appendChild(Object.assign(document.createElement('td'), {
        className: 'author',
        innerHTML: el.querySelector('[title="Автор публикации"]').outerHTML
    }));

    row.appendChild(Object.assign(document.createElement('td'), {
        className: 'date',
        innerHTML: Habr.parseDate(el.querySelector('span.post__time').innerHTML)
    }));

    row.appendChild(Object.assign(document.createElement('td'), {
        className: 'title',
        innerHTML: el.querySelector('h2.post__title a').outerHTML
    }));

    row.appendChild(Object.assign(document.createElement('td'), {
        className: 'tags',
        innerHTML: Habr.grabTags(el)
    }));

    table.appendChild(row);
});

let list = document.querySelector('.user_favorites');
list.insertBefore(table, list.firstChild);
