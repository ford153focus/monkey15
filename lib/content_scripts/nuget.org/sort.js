function getDownloads(package) {
    download = package.querySelector('i.ms-Icon.ms-Icon--Download').parentElement.innerText;
    download = download.replace(',', '');
    download = parseInt(download);
    return download;
}

packages = document.querySelectorAll('article.package[role="listitem"]');
packages = [...packages];

class Sort {
    static byAuthor() {
        packages
            .sort((package1, package2) => {
                let author1 = package1.querySelector('span.package-by a').innerText;
                let author2 = package2.querySelector('span.package-by a').innerText;
                return author1.localeCompare(author2);
            })
            .map((node) => {
                document.querySelector('div.list-packages[role="list"]').appendChild(node);
            });
    }

    static byDownloads() {
        packages
            .sort((package1, package2) => {
                return getDownloads(package2)-getDownloads(package1);
            })
            .map((node) => {
                document.querySelector('div.list-packages[role="list"]').appendChild(node);
            });
    }

    static byName() {
        packages
            .sort((package1, package2) => {
                let title1 = package1.querySelector('a.package-title').innerText;
                let title2 = package2.querySelector('a.package-title').innerText;
                return title1.localeCompare(title2);
            })
            .map((node) => {
                document.querySelector('div.list-packages[role="list"]').appendChild(node);
            });
    }
}

document.querySelector('.cell-controls').innerHTML += `
    <span>
        Sort by:
        <a href="#" class="sorter author">author</a>
        <span>|</span>
        <a href="#" class="sorter downloads">downloads</a>
        <span>|</span>
        <a href="#" class="sorter name">name</a>
    </span>

    <style>
    </style>
`;

document.querySelector('.sorter.author').onclick = function() {
    Sort.byAuthor();
}
document.querySelector('.sorter.downloads').onclick = function() {
    Sort.byDownloads();
}
document.querySelector('.sorter.name').onclick = function() {
    Sort.byName();
}
