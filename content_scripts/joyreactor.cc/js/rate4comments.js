/**
 * Async vote function
 * @param {Element} span Vote button, HTML Element
 * @returns {Promise<void>} Empty promise
 */
async function vote(span) {
    let commentId = span.parentNode.parentNode.querySelector('.comment_link').href.match(/\d+$/g);
    let voteDirection = span.attributes['data-vote'].value;

    fetch(`/comment_vote/add/${commentId}/${voteDirection}?token=${token}`).then(async function (response) {
        span.parentNode.getElementsByTagName('span')[1].outerHTML = await response.text()
    });
}

/**
 * Inject vote function to page
 */
(() => {
    let script = document.createElement('script');
    script.textContent = vote.toString();
    document.documentElement.appendChild(script);
})();

for (const h3 of document.getElementsByTagName('h3')) {
    if (h3.innerText !== 'Отличный комментарий!') continue;

    let highlightedComments = h3.parentNode.parentNode.querySelectorAll('div.comment.hightlighted.filled');
    let voteUpTag = '<span class="c-vote-plus" title="vote up" data-vote="plus" onclick="vote(this)"></span>';
    let voteDownTag = '<span class="c-vote-minus" title="vote down" data-vote="minus" onclick="vote(this)"></span>';

    for (const comment of highlightedComments) {
        const ratingTag = comment.getElementsByClassName('post_rating')[0];
        ratingTag.insertAdjacentHTML('afterbegin', voteUpTag);
        ratingTag.insertAdjacentHTML('beforeend', voteDownTag);

        const commentText = comment.querySelector('div').innerText.trim();
        if (commentText === 'Комментарий скрыт.') {
            let commentId = new URL(comment.querySelector('a.comment_link').href).hash.match(/\d+$/g)[0];
            fetch(`/post/comment/${commentId}`).then(async (response) => {
                comment.querySelector('div').innerHTML = await response.text();
            });
        }
    }
}

/**
 * Get styles of original vote buttons
 * and apply them to own custom vote buttons
 */
(() => {
    const plusVoterStyles = window.getComputedStyle(document.querySelector('div.vote-plus'));
    const minusVoterStyles = window.getComputedStyle(document.querySelector('div.vote-minus'));

    for (const customUpVoter of document.querySelectorAll('span.c-vote-plus')) {
        for (let style of plusVoterStyles) {
            customUpVoter.style[style] = plusVoterStyles[style];
        }
    }

    for (const customDownVoter of document.querySelectorAll('span.c-vote-minus')) {
        for (let style of minusVoterStyles) {
            customDownVoter.style[style] = minusVoterStyles[style];
        }
    }
})();
