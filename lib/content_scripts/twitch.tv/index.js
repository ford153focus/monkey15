/*eslint no-new: 0*/

class Twitch {
    constructor() {
        // noinspection MagicNumberJS
        setInterval(Twitch.adBlock, 4444);
        // noinspection MagicNumberJS
        setInterval(Twitch.hideCasinos, 4444);
    }

    /**
     * Hide big ad block
     */
    static adBlock() {
        document.querySelectorAll('div[id^="dfp-directory-"]').forEach((item) => {
            item.remove();
        });
    }

    /**
     * Hide casinos channels
     */
    static hideCasinos() {
        document.querySelectorAll('.tw-mg-b-2').forEach((item) => {
            let linkToGame = item.querySelector('a[href^="/directory/game/"]');
            let streamName = item.querySelector('h3');

            if (streamName !== null && streamName.innerText.search(/(казино|слоты)/i) > -1) {
                item.parentNode.remove();
            }

            if (linkToGame !== null && linkToGame.innerHTML === 'Casino') {
                item.parentNode.remove();
            }
        });
    }
}

// noinspection ObjectAllocationIgnored
new Twitch();
