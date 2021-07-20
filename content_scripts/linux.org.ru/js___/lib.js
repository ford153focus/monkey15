export let db = window.openDatabase('m15', '21.06.28-2', 'Monkey 15', 2 * 1024 * 1024);

/** Create tables */
db.transaction((tx) => tx.executeSql('CREATE TABLE IF NOT EXISTS banned_topics (url TEXT UNIQUE, timestamp INTEGER)'));

/** Clean old bans */
function cleanUpOldTopicsBans() {
    let obsoletionDate = new Date();
    obsoletionDate.setMonth(obsoletionDate.getMonth()-6);
    db.transaction((tx) => tx.executeSql('DELETE FROM banned_topics WHERE timestamp < ?', [obsoletionDate]));
}

export function saveBanToStorage(url) {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO banned_topics (url, timestamp) VALUES (?, ?)',
            [url, Date.now()]
        );
    });
}

/**
 * get list of banned topics
 * @returns {boolean|string[]} list of banned topics
 */
export function getAllBannedTopics() {
    cleanUpOldTopicsBans();
    let hiddenTopics;

    db.readTransaction((tx) => {
        tx.executeSql(
            'SELECT * FROM banned_topics',
            [],
            (tx, results) => hiddenTopics=results,
            (tx, err) => {
                console.error(`WebSQL error (${err.code}): ${err.message}`);
                throw err.message;
            }
        );
    });

    if (hiddenTopics.rows.length < 1) return false;
    return [...hiddenTopics.rows].map(t => t.url);
}

export function isTopicBanned(url) {
    cleanUpOldTopicsBans();
    let hiddenTopics;

    db.readTransaction((tx) => {
        tx.executeSql(
            'SELECT * FROM banned_topics WHERE url=?',
            [url],
            (tx, results) => hiddenTopics=results,
            (tx, err) => {
                console.error(`WebSQL error (${err.code}): ${err.message}`);
                throw err.message;
            }
        );
    });

    return hiddenTopics.rows.length > 0;
}
