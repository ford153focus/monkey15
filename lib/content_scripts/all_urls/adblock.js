let whiteList = {
    'iframe': {
        'hosts': [
            '.local',
            'samolet.',
            'onedrive.live.com',
            '.google.com'
        ],
        'hrefs': [
            '/bitrix/admin/'
        ]
    }
};

(new Promise((resolve) => {
    resolve();
}))
    .then(() => {
        for (let host of whiteList.iframe.hosts) {
            if (window.location.host.includes(host)) {
                throw new Error("whitelisted host");
            }
        }
    })
    .then(() => {
        for (let href of whiteList.iframe.hrefs) {
            if (window.location.href.search(href) > -1) {
                throw new Error("whitelisted url");
            }
        }
    })
    .then(() => {
        document.querySelectorAll('iframe').forEach((el) => {
            el.remove();
        });
    });
