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

setInterval(() => {
    for (const item of document.querySelectorAll('.tw-mg-b-2')) {
        let gameLink = item.querySelector('a[href^="/directory/game/"]');
        if (gameLink !== null && forbiddenGameLinks.includes(gameLink.innerText)) item.parentNode.remove();

        let streamName = item.querySelector('h3');
        if (streamName !== null && forbiddenStreamNames.includes(streamName.innerText)) item.parentNode.remove();
    }
}, 5310);
