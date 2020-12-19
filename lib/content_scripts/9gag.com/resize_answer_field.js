document.querySelectorAll('textarea.post-text-area').forEach((el) => {
    el.addEventListener('keyup', () => {
        el.style.height = 'auto';
        if (el.value) {
            el.style.height = el.scrollHeight + 5 + 'px';
        }
    });
})
