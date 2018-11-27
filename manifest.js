let manifest = {
    "author": "ford153focus",
    "background": {
        "persistent": false,
        "scripts": [
            "lib/background.js"
        ]
    },
    "content_scripts": [
        {
            "css": [
                "assets/css/feedly.css",
                "assets/css/fontawesome.v5.3.1.css"
            ],
            "js": [
                "lib/content_scripts/feedly.com/index.js",
                "lib/utils.js"
            ],
            "matches": [
                "https://feedly.com/i/*"
            ],
            "run_at": "document_idle"
        },
        {
            "css": [
                "assets/css/habr.css"
            ],
            "js": [
                "lib/content_scripts/habr.com/index.js"
            ],
            "matches": [
                "https://habr.com/users/*/favorites/"
            ],
            "run_at": "document_idle"
        },
        {
            "js": [
                "lib/content_scripts/3dnews.ru/index.js"
            ],
            "matches": [
                "https://3dnews.ru/*"
            ],
            "run_at": "document_idle"
        },
        {
            "js": [
                "lib/content_scripts/avito.ru/index.js"
            ],
            "matches": [
                "https://www.avito.ru/*"
            ],
            "run_at": "document_idle"
        },
        {
            "js": [
                "lib/content_scripts/phoronix.com/index.js"
            ],
            "matches": [
                "https://www.phoronix.com/scan.php?page=article&*"
            ],
            "run_at": "document_idle"
        },
        {
            "js": [
                "lib/content_scripts/twitch.tv/index.js"
            ],
            "matches": [
                "https://www.twitch.tv/*"
            ],
            "run_at": "document_idle"
        },
        {
            "js": [
                "lib/content_scripts/ulmart.ru/index.js"
            ],
            "matches": [
                "*://discount.ulmart.ru/*"
            ],
            "run_at": "document_idle"
        },
        {
            "js": [
                "lib/content_scripts/wikia.com/index.js"
            ],
            "matches": [
                "http://*.wikia.com/*"
            ],
            "run_at": "document_idle"
        }
    ],
    "description": "Make the web better",
    "icons": {
        "16": "assets/img/icon/bund16.jpg",
        "48": "assets/img/icon/bund48.jpg",
        "128": "assets/img/icon/bund128.jpg"
    },
    "manifest_version": 2,
    "name": "Monkey 15",
    "permissions": [
        "notifications"
    ],
    "web_accessible_resources": [
        "assets/html/feedly_actions.html"
    ]
};

function generateForFirefox() {
    manifest.applications = {
        "gecko": {
            "id": "monkey15@ford-rt.com",
            "strict_min_version": "60.0"
        }
    };
}

manifest.version = (require('phpdate-js'))('y.m.d.H');

switch (process.argv[2]) {
    case "--firefox":
        console.log("Generating manifest for Firefox");
        generateForFirefox();
        break;
    case "--chrome":
        console.log("Generating manifest for Google Chrome");
        break;
}

(require('fs')).writeFile('manifest.json', JSON.stringify(manifest), (err) => {if (err) throw err;});
