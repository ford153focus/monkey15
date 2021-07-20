import {saveBanToStorage} from './lib';

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
