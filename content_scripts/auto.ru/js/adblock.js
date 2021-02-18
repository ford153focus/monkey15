let blackList = [
    'moevideo.biz',
    'pubmine.com',
    'serving-sys.com'
];

setTimeout(() => {
    for (const iframe of document.querySelectorAll('iframe')) {
        for (let url of blackList) {
            if (iframe.src.includes(url)) {
                iframe.remove();
            }
        }
    }
}, 1530);

document.removeSelectorAll('.ListingItem-module__adv');
