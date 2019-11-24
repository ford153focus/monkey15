async function vote(span) {
    let commentId = span.parentNode.parentNode.querySelector('.comment_link').href.match(/\d+$/g);
    let voteDirection = span.attributes['data-vote'].value;

    fetch(`/comment_vote/add/${commentId}/${voteDirection}?token=${token}`).then(async function (response) {
        span.parentNode.getElementsByTagName('span')[1].outerHTML = await response.text()
    });
}

// inject
(() => {
    let script = document.createElement('script');
    script.textContent = vote.toString();
    document.documentElement.appendChild(script);
})();

[...document.getElementsByTagName('h3')].filter((h3) => {
    return h3.innerText === 'Отличный комментарий!'
}).forEach((h3) => {
    let highlightedComments = h3.parentNode.parentNode.querySelectorAll('div.comment.hightlighted.filled');
    let voteUpTag = '<span class="c-vote-plus" title="vote up" data-vote="plus" onclick="vote(this)"></span>';
    let voteDownTag = '<span class="c-vote-minus" title="vote down" data-vote="minus" onclick="vote(this)"></span>';
    highlightedComments.forEach((comment) => {
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
    });
});

// restyle
(() => {
    const plusVoterStyles = window.getComputedStyle(document.querySelector('div.vote-plus'));
    const minusVoterStyles = window.getComputedStyle(document.querySelector('div.vote-minus'));

    document.querySelectorAll('span.c-vote-plus').forEach((customUpVoter) => {
        for (style of plusVoterStyles) {
            customUpVoter.style[style] = plusVoterStyles[style];
        }
    });

    document.querySelectorAll('span.c-vote-minus').forEach((customDownVoter) => {
        for (style of minusVoterStyles) {
            customDownVoter.style[style] = minusVoterStyles[style];
        }
    })
})();
