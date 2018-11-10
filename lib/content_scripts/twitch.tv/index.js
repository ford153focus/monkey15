class Twitch {
    constructor() {
        setInterval(Twitch.adBlock, 4444);
        setInterval(Twitch.hideCasinos, 4444);
    }

    /**
     * Hide big ad block
     */
    static adBlock() {
        if (document.getElementById("dfp-directory-rectangle") !== null) {
            document.getElementById("dfp-directory-rectangle").remove();            
        }
    }

    /**
     * Hide casinos channel
     */
    static hideCasinos() {
        document.querySelectorAll(".tw-mg-b-2").forEach(function (item) {
            let linkToGame = item.querySelector("a[href^='/directory/game/']");
            let streamName = item.querySelector("h3");

            if (streamName !== null && streamName.innerText.search(/(казино|слоты)/i) > -1) {
                // noinspection JSUnresolvedFunction
                item.parentNode.remove();
            }

            if (linkToGame !== null && linkToGame.innerHTML === "Casino") {
                // noinspection JSUnresolvedFunction
                item.parentNode.remove();
            }
        });
    }
}

new Twitch();
