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

document.querySelector('.material-near-feed').remove();
document.querySelector('.material-uservote-feed').remove();

document.getElementsByClassName('material-other-feed')[0].remove();
