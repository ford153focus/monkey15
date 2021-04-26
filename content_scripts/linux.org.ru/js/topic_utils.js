function saveBanToStorage(url) {
    let hiddenTopics = localStorage.getItem('hidden_topics') ? JSON.parse(localStorage.getItem('hidden_topics')) : [];
    hiddenTopics.push(url);
    localStorage.setItem('hidden_topics', JSON.stringify(hiddenTopics));
}

let favButtons = document.querySelector('div.fav-buttons');
if (favButtons !== null) {
    let hideAndRedirectButton = document.createElement('a');
    hideAndRedirectButton.innerText = '🗑';
    hideAndRedirectButton.style.cursor = 'pointer';
    hideAndRedirectButton.onclick = () => {
        saveBanToStorage(window.location.pathname);
        window.location.href = '/tracker/';
    };
    favButtons.appendChild(document.createElement('br'));
    favButtons.appendChild(document.createElement('br'));
    favButtons.appendChild(hideAndRedirectButton);
}
