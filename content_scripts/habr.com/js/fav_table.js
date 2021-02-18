let articles = [];
let page = 1;
let gotArticles = true;

while (gotArticles) {
    let newArticles = window._frt.fetchJsonSync('https://m.habr.com/kek/v2/articles/?user=ford153focus&user_bookmarks=true&fl=ru&hl=ru&page=' + page);

    if (newArticles.articleIds.length > 0) {
        for (const articleId of newArticles.articleIds) {
            articles.push(newArticles.articleRefs[articleId]);
        }
        page++;
    } else {
        gotArticles = false;
    }
}

let table = document.createElement('table');
table.id = 'fav_table';
table.className = 'table table-hover table-bordered align-middle';
let tBody = table.createTBody();

let tHead = table.createTHead();
tHead.className = 'table-dark';
let tHeadRow = document.createElement('tr');
tHeadRow.innerHTML += `<th><i class="far fa-calendar-alt"></i> Date</th>`;
tHeadRow.innerHTML += `<th><i class="fas fa-user"></i> User</th>`;
tHeadRow.innerHTML += `<th>Title</th>`;
tHeadRow.innerHTML += `<th><i class="fas fa-tags"></i> Tags</th>`;
tHeadRow.innerHTML += `<th><i class="fas fa-poll"></i> Stats</th>`;
tHead.appendChild(tHeadRow);

for (const article of articles) {
    let row = document.createElement('tr');

    let idCell = document.createElement('td');
    idCell.className = 'id';
    idCell.innerHTML = `<a href='/ru/post/${article.id}/'>${article.id}</a>`;
    //row.appendChild(idCell);

    let dateCell = document.createElement('td');
    dateCell.className = 'date';
    let date = new Date(article.timePublished);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    dateCell.innerHTML = `${year}-${month}-${day}<br>${hour}:${minutes}:${seconds}`;
    row.appendChild(dateCell);

    let authorCell = document.createElement('td');
    authorCell.className = 'author';
    if (article.author.avatarUrl !== '') {
        authorCell.innerHTML += `<a class='avatar' href='/ru/users/${article.author.login}/'>
                                     <img alt='avatar' src='${article.author.avatarUrl}'>
                                 </a><br>`;
    }
    authorCell.innerHTML += `<a class='alias' href='/ru/users/${article.author.login}/'>${article.author.alias}</a>`;
    if (article.author.fullname !== null) {
        authorCell.innerHTML += `<br> <a class='real_name' href='/ru/users/${article.author.login}/'>(${article.author.fullname})</a>`
    }
    row.appendChild(authorCell);

    let titleCell = document.createElement('td');
    titleCell.className = 'title';
    titleCell.innerHTML = `<p><a href='/ru/post/${article.id}/'><h2>${article.titleHtml}</h2></a></p>`;
    let introText = window._frt.stripTags(article.leadData.textHtml)
        .trim()
        .replaceAll(/\n+/ig, '. ')
        .substring(0, 333);
    titleCell.innerHTML += `<p class='intro_text'>${introText}...</p>`;
    row.appendChild(titleCell);

    let hubsCell = document.createElement('td');
    let hubList = document.createElement('ul');
    hubsCell.className = 'hubs';
    for (const hub of article.hubs) {
        let hubType = hub.type === 'corporative' ? 'company' : 'hub';
        hubList.innerHTML += `<li><i class="fas fa-tag"></i> <a href='/ru/${hubType}/${hub.alias}/'>${hub.title}</a></li>`;
    }
    hubsCell.appendChild(hubList);
    row.appendChild(hubsCell);

    let statsCell = document.createElement('td');
    statsCell.className = 'stats';
    statsCell.innerHTML = `
                           <i class="fas fa-comments"></i> ${article.statistics.commentsCount} <br>
                           <i class="far fa-bookmark"></i> ${article.statistics.favoritesCount} <br>
                           <i class="far fa-glasses"></i> ${article.statistics.readingCount} <br>
                           <i class="fas fa-medal"></i> ${article.statistics.score} <br>
                           <i class="fas fa-vote-yea"></i> ${article.statistics.votesCount}
                          `;
    row.appendChild(statsCell);

    tBody.appendChild(row);
}

let favListEl = document.querySelector('.user_favorites');
favListEl.insertBefore(table, favListEl.firstChild);

window._frt.loadBootstrap();
window._frt.loadFontAwesome();

document.querySelector('ul.content-list.shortcuts_items').style.display = 'none';
document.querySelector('ul.arrows-pagination').style.display = 'none';
document.getElementById('nav-pagess').style.display = 'none';
