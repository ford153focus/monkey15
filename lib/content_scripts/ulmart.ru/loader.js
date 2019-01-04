/**
 * Load more
*/
setInterval(() => {
    try {
        if (document.querySelector('a.read_next') !== null) {
            document.querySelector('a.read_next').click();
        }
    } catch (e) {
        console.error(e); 
    }
}, 4444);
