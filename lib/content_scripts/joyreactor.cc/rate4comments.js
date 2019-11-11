async function vote(span) {
    let commentId = span.parentNode.parentNode.querySelector('.comment_link').href.match(/\d+$/g);
    let voteDirection = span.attributes['data-vote'].value;

    fetch(`/comment_vote/add/${commentId}/${voteDirection}?token=${token}`).then(async function(response) {
        span.parentNode.getElementsByTagName('span')[1].outerHTML = await response.text()
    });
}

let script = document.createElement('script');
script.textContent = vote.toString();
document.documentElement.appendChild(script);

[...document.getElementsByTagName('h3')].filter((h3) => {
    return h3.innerText === 'Отличный комментарий!'
}).forEach((h3) => {
    let highlightedComments = h3.parentNode.parentNode.querySelectorAll('div.comment.hightlighted.filled');
    highlightedComments.forEach((comment) => {
        let ratingTag = comment.getElementsByClassName('post_rating')[0];
        ratingTag.insertAdjacentHTML('afterbegin', '<span class="c-vote-plus" title="vote up" data-vote="plus" onclick="vote(this)">😀</span>');
        ratingTag.insertAdjacentHTML('beforeend', '<span class="c-vote-minus" title="vote down" data-vote="minus" onclick="vote(this)">😦</span>');
    });
});
