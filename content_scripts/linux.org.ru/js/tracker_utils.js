class TrackerUtils {
    static saveBanToStorage(url) {
        let hiddenTopics = localStorage.getItem('hidden_topics') ? JSON.parse(localStorage.getItem('hidden_topics')) : [];
        hiddenTopics.push(url);
        localStorage.setItem('hidden_topics', JSON.stringify(hiddenTopics));
    }

    /**
     * Hide banned topics on start
     */
    static hideTopics() {
        let hiddenTopics = localStorage.getItem('hidden_topics');
        if (hiddenTopics === null) {
            return;
        } else {
            hiddenTopics = JSON.parse(hiddenTopics);
        }

        for (const row of document.querySelectorAll('table.message-table tbody tr')) {
            let href = row.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href;
            let url = new URL(href);
            if (hiddenTopics.includes(url.pathname)) {
                // row.style.display = 'none';
                row.remove();
            }
        }
    }

    /**
     * Ban selected topic
     * @param {MouseEvent} event Click-event of hiding button
     */
    static hideTopic(event) {
        let row = event.target.parentElement.parentElement;
        // row.style.display = 'none';
        row.remove();

        /** Get url of topic */
        let href = row.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href;
        let url = new URL(href);

        /** Add topic to local storage */
        TrackerUtils.saveBanToStorage(url.pathname);
    }

    static pickRandomTopic() {
        let topics = document.querySelectorAll('table.message-table tbody tr');
        let randomPickedNumber = Math.ceil(Math.random()*topics.length);
        let randomPickedLink = topics[randomPickedNumber].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
        randomPickedLink.click();
    }

    /**
     * Draw action buttons
     */
    static drawButtons() {
        for (const row of document.querySelectorAll('table.message-table tbody tr')) {
            let hideButton = document.createElement('button');
            // hideButton.type = 'button';
            hideButton.innerText = '♻';
            hideButton.onclick = TrackerUtils.hideTopic;

            let actionsCell = document.createElement('td');
            actionsCell.appendChild(hideButton);

            row.appendChild(actionsCell);
        }

        let randomPickButton = document.createElement('a');
        randomPickButton.className = 'btn btn-default';
        randomPickButton.innerHTML = 'Pick Random';
        randomPickButton.onclick = TrackerUtils.pickRandomTopic;
        document.querySelector('nav').appendChild(randomPickButton);
    }

    static init() {
        TrackerUtils.hideTopics();
        TrackerUtils.drawButtons();
    }
}

TrackerUtils.init();
