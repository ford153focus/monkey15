document.addEventListener('keypress', (event) => {
    if (event.code === 'ArrowLeft' && event.ctrlKey === true) {
        document.querySelector('#main article .foot .pagination span').previousSibling.click();
    }
    if (event.code === 'ArrowRight' && event.ctrlKey === true) {
        document.querySelector('#main article .foot .pagination span').nextSibling.click();
    }
});
