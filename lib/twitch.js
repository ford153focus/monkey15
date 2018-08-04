class Twitch {
    constructor() {
        setInterval(this.adBlock, 4444);
        setInterval(this.hideCasinos, 4444);
    }

    adBlock() {
        document.getElementById("dfp-directory-rectangle").remove();
    }

    hideCasinos() {
        document.querySelectorAll(".tw-mg-b-2").forEach(function (item) {
            let linkToGame = item.querySelector("a[href^='/directory/game/']");
            if (linkToGame !== null && linkToGame.innerHTML === "Casino") {
                    item.parentNode.remove();
            }
        });
    }
}

new Twitch();
