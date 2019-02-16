function adBlock() {
    [...document.querySelectorAll('span.ago')].map((article) => {
        if (article.innerText === 'Sponsored') {
            article.parentElement.remove();
        }
    });
}

function sortByName() {
    let articles = document.querySelectorAll('.list-entries .entry');

    [...articles]
        .sort((article1, article2) => {
            let title1 = article1.attributes.getNamedItem('data-title').value;
            let title2 = article2.attributes.getNamedItem('data-title').value;
            return title1.localeCompare(title2);
        })
        .map((article) => {
            articles[0].parentElement.appendChild(article);
        });
}

function sortByPopularity() {
    function getArticleEngagement(article) {
        let engagementElem = article.querySelector('span.engagement');
        if (!engagementElem) {
            return 0;
        } else {
            let engagementTxt = engagementElem.innerText.replace(/k$/i, '000').replace(/\+$/, '');
            let engagement = parseInt(engagementTxt);
            return engagement;
        }
    }

    let articles = document.querySelectorAll('.list-entries .entry');

    [...articles]
        .sort((article1, article2) => {
            return getArticleEngagement(article2)-getArticleEngagement(article1);
        })
        .map((article) => {
            articles[0].parentElement.appendChild(article);
        });
}

function pickRandom() {
    let articles = document.querySelectorAll('.list-entries .entry');
    let randomArticleNumber = Math.floor(Math.random() * articles.length);
    let randomArticle = articles[randomArticleNumber];
    let randomArticleUrl = randomArticle.querySelector('a.title').href;
    window.open(randomArticleUrl); //open entry in new tab
    randomArticle.click();
    // noinspection MagicNumberJS
    setTimeout(() => {
        document.querySelector('div.feedIndex.selected .feedTitle').click();
    }, 333)
}

function drawActions() {
    function getActionsComponentText() {
        let actionsComponentUrl = chrome.runtime.getURL('assets/feedly.com/html/actions.html');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', actionsComponentUrl, false);
        xhr.send();
        return xhr.responseText;
    }

    function insertActionsComponent(selector) {
        // debugger;
        if (document.querySelector(selector) !== null) {
            if (document.querySelector(selector+' div._frt_actions') === null) {
                document.querySelector(selector).insertAdjacentHTML('afterBegin', getActionsComponentText());

                document.getElementById('_frt_pick_random').addEventListener('click', pickRandom);
                document.getElementById('_frt_sort_az').addEventListener('click',  sortByName);
                document.getElementById('_frt_sort_p').addEventListener('click', sortByPopularity);
            }
        }
    }

    try {
        insertActionsComponent('.actions-container');
        insertActionsComponent('#headerBarFX header div');
    } catch (error) {
        console.warn(error);
    }
}

setInterval(() => {
    adBlock();
    drawActions();
}, 333);
