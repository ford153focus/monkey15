document.getElementById('onetag-wrapper-0').remove();
document.getElementById('mobile-anchor').remove();
document.getElementById('header_leaderboard').remove();
document.getElementById('below_the_article').remove();
document.getElementById('rightcol_top_anchor').remove();
document.getElementsByClassName('page-content-rightcol')[0].remove();

document.querySelectorAll('[data-google-query-id]').forEach((el) => {
    el.remove();
});

[...document.getElementsByTagName('iframe')].forEach((el) => {
    el.remove();
});
