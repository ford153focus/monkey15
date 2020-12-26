document.querySelectorAll('div.banner').forEach((el) => {
    el.remove();
});

document.querySelectorAll('.sticky-rails').forEach((el) => {
    el.remove();
});

document.querySelectorAll('.itemLinkPET').forEach((el) => {
    el.remove();
});

document.querySelector('.bet-embed')?.remove();
document.querySelector('.inread-banner')?.remove();
document.querySelector('.inset-banner')?.remove();

document.getElementById('comments')?.remove();
document.getElementById('subscription_block')?.remove();
