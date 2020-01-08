document.querySelector('.five.wide.column').remove();

document.querySelectorAll('[class*="top-an"]').forEach((el) => {
    el.remove();
});

document.querySelectorAll('.material-inline-an').forEach((el) => {
    el.remove();
});

document.querySelector('.ui.warning.message').remove();

document.querySelectorAll('ins').forEach((el) => {
    el.remove();
});

document.getElementById('comments').remove();

document.getElementsByClassName('material-near-feed')[0].remove();
document.getElementsByClassName('material-uservote-feed')[0].remove();
document.getElementsByClassName('material-other-feed')[0].remove();
document.getElementsByClassName('comments-feed')[0].remove();
