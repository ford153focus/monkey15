class FavsUtils {
    static drawTable() {
        let tableMarkup = `
        <div class="forum">
        <table class="table message-table">
            <thead>
                <tr>
                    <th><i class="far fa-calendar-alt"></i> Date</th>
                    <th>Group</th>
                    <th><i class="icon-user icon-user-color"></i> Author</th>
                    <th>Title</th>
                    <th><i class="icon-tag"></i> Tags</th>
                    <th style="white-space: nowrap;"><i class="fas fa-comments"></i> Comments #</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        </div>
        `;

        document.getElementById('bd').innerHTML = '';
        document.getElementById('bd').insertAdjacentHTML('afterbegin', tableMarkup);

        window._frt.loadFontAwesome();
    }

    static fillTable() {
        let tbody = document.querySelector('#bd table.message-table tbody');

        const xhr = new XMLHttpRequest();
        const parser = new DOMParser();

        let endReached = false;
        let offset = 0;

        while (!endReached) {
            xhr.open('GET', `${window.location.href}?offset=${offset}`, false);
            xhr.send(null);
            let htmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
            let articles = htmlDoc.querySelectorAll('#bd article');

            if (articles.length < 20) {
                endReached = true;
            } else {
                offset += 20;
            }

            for (const article of articles) {
                let row = document.createElement('tr');

                let dateCell = document.createElement('td');
                let dateCreated = article.querySelector('div.entry-body div.sign time');
                dateCreated ? dateCell.appendChild(dateCreated).cloneNode(true) : false;
                row.appendChild(dateCell);

                let groupCell = document.createElement('td');
                groupCell.style.whiteSpace = 'nowrap';
                let group = article.querySelector('div.group');
                group.innerHTML = group.innerHTML.replace(' — ', '<br>');
                group ? groupCell.appendChild(group).cloneNode(true) : false;
                row.appendChild(groupCell);

                let authorCell = document.createElement('td');
                authorCell.style.whiteSpace = 'nowrap';
                let author = article.querySelector('div.entry-body div.sign');
                if (author !== null) {
                    author.innerHTML = author.innerHTML.trim().replace('()', '').trim();
                    // noinspection HtmlUnknownTarget
                    author.insertAdjacentHTML('afterbegin', '<img src="/img/tuxlor.png" alt="@" title="@" width="7" height="16"> ');
                    authorCell.appendChild(author).cloneNode(true);
                }
                row.appendChild(authorCell);

                let titleCell = document.createElement('td');
                let title = article.querySelector('h1 a');
                title ? titleCell.appendChild(title).cloneNode(true) : false;
                row.appendChild(titleCell);

                let tagsCell = document.createElement('td');
                let tags = article.querySelector('div.entry-body p.tags');
                tags ? tagsCell.appendChild(tags).cloneNode(true) : false;
                row.appendChild(tagsCell);

                let commentsCell = document.createElement('td');
                let comments = article.querySelector('div.entry-body div.nav a');
                if (comments !== null) {
                    comments.innerText = parseInt(comments.innerText).toString();
                    commentsCell.appendChild(comments).cloneNode(true);
                }
                row.appendChild(commentsCell);

                tbody.appendChild(row);
            }
        }
    }

    static init() {
        FavsUtils.drawTable();
        FavsUtils.fillTable();
    }
}

FavsUtils.init();
