for (const el of document.querySelectorAll('textarea.post-text-area')) {
    el.addEventListener('keyup', () => {
        el.style.height = el.value ? `${el.scrollHeight + 5}px` : 'auto';
    });
}
