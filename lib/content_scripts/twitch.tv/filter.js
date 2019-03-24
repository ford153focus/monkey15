let forbiddenGameLinks = [
    'Casino',
    'Just Chatting',
    'Slots'
];

let forbiddenstreamNames = [
    'казино',
    'слоты'
];

function cleaner(item) {
    let gameLink = item.querySelector('a[href^="/directory/game/"]');
    let streamName = item.querySelector('h3');

    if (gameLink !== null && forbiddenstreamNames.includes(streamName.innerText)) {
        item.parentNode.remove();
    }

    if (gameLink !== null && forbiddenGameLinks.includes(gameLink.innerText)) {
        item.parentNode.remove();
    }
}

setInterval(function() {
    document.querySelectorAll('.tw-mg-b-2').forEach((item) => {
        try {
            cleaner(item)
        } catch (error) {
            console.error(error);
        }
    });
}, 4444);
