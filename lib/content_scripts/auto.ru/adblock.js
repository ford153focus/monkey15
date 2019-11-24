let blackList = [
    'moevideo.biz',
    'pubmine.com',
    'serving-sys.com'
];

setTimeout(() => {
    document.querySelectorAll('iframe').forEach((iframe) => {
        for (let url of blackList) {
            if (iframe.src.search(url) > -1) {
                iframe.remove();
            }
        }
    });
}, 1530);

document.querySelectorAll('.ListingItem-module__adv').forEach((item) => {
    item.remove();
});
