// noinspection MagicNumberJS
setTimeout(function() {
    document.querySelectorAll('.tw-mg-b-2').forEach((item) => {
        let gameLink = item.querySelector('a[href^="/directory/game/"]');
        let streamName = item.querySelector('h3');

        if (streamName !== null && streamName.innerText.search(/(казино|слоты)/i) > -1) {
            item.parentNode.remove();
        }

        if (gameLink !== null && (gameLink.innerText === 'Casino' || gameLink.innerText === 'Slots')) {
            item.parentNode.remove();
        }
    });
}, 4444);
