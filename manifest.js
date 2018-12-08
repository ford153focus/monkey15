let fs = require('fs');

let manifest = {
    "author": "ford153focus",
    "background": {
        "persistent": false,
        "scripts": [
            "lib/background.js"
        ]
    },
    "content_scripts": [],
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

let content_scripts_dir = __dirname + "/lib/content_scripts/";

for (let item of fs.readdirSync(content_scripts_dir)) {
    let content_script_manifest = __dirname + "/lib/content_scripts/"+item+"/manifest.json";
    if (fs.existsSync(content_script_manifest) === true) {
        let obj = JSON.parse(fs.readFileSync(content_script_manifest, 'utf8'));
        manifest.content_scripts = manifest.content_scripts.concat(obj.content_scripts);
    }
}

fs.writeFileSync('manifest.json', JSON.stringify(manifest));
