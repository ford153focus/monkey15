for (const responseButton of document.querySelectorAll('a.response')) {
    responseButton.onclick = () => {
        for (const responseField of document.querySelectorAll('textarea.comment_text')) {
            responseField.addEventListener('keyup', () => {
                responseField.style.height = responseField.value ? `${responseField.scrollHeight+5}px` : 'auto';
            });
        }
    };
}
