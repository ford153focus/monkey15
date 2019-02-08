let blackList = [
    'pubmine.com'
];

document.querySelectorAll('iframe').forEach((iframe) => {
    for (let url of blackList) {
        if (iframe.src.search(url) > -1) {
            iframe.remove();
        }
    }
});
