function fixHeight(event) {
    let commentInput = event.target;
    if (commentInput.scrollHeight !== commentInput.clientHeight) {
        commentInput.style.height = commentInput.scrollHeight+5+'px';
    }
}

function assignWatcher() {
    let commentInputs = document.querySelectorAll('textarea.comment_text');

    for (const commentInput of commentInputs) {
        commentInput.onkeyup = fixHeight;
    }
}

document.onmouseup = assignWatcher;
