let actionsComponentUrl = chrome.runtime.getURL('assets/openwrt.org/html/filters.html');
let xhr = new XMLHttpRequest();
xhr.open('GET', actionsComponentUrl, false);
xhr.send();

document.querySelector('div.table.dataaggregation').insertAdjacentHTML('beforebegin', xhr.responseText);
