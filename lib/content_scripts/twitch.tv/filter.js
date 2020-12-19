let forbiddenGameLinks = [
    'Casino',
    'Just Chatting',
    'Poker',
    'Slots',
    'Virtual Casino'
];

let forbiddenStreamNames = [
    'казино',
    'слоты'
];

function cleaner(item) {
    let gameLink = item.querySelector('a[href^="/directory/game/"]');
    let streamName = item.querySelector('h3');

    if (gameLink !== null && forbiddenStreamNames.includes(streamName.innerText)) {
        item.parentNode.remove();
    }

    if (gameLink !== null && forbiddenGameLinks.includes(gameLink.innerText)) {
        item.parentNode.remove();
    }
}

setInterval(() => {
    document.querySelectorAll('.tw-mg-b-2').forEach((item) => {
        try {
            cleaner(item)
        } catch (error) {
            console.error(error);
        }
    });
}, 4444);
