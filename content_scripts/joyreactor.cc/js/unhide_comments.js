let commentShowLinks = document.querySelectorAll('a.comment_show');
for (const link of commentShowLinks) {
    fetch(link.href).then(async (response) => {
        link.parentNode.parentNode.innerHTML = await response.text();
    });
}
