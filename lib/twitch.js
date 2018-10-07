class Twitch {
    constructor() {
        setInterval(this.adBlock, 4444);
        setInterval(this.hideCasinos, 4444);
    }

    adBlock() {
        if (document.getElementById("dfp-directory-rectangle") !== null) {
            document.getElementById("dfp-directory-rectangle").remove();            
        }
    }

    hideCasinos() {
        document.querySelectorAll(".tw-mg-b-2").forEach(function (item) {
            let linkToGame = item.querySelector("a[href^='/directory/game/']");
            let streamName = item.querySelector("h3");

            if (streamName !== null && streamName.innerText.search(/(казино|слоты)/i) > -1) {
                item.parentNode.remove();
            }

            if (linkToGame !== null && linkToGame.innerHTML === "Casino") {
                item.parentNode.remove();
            }
        });
    }
}

new Twitch();
