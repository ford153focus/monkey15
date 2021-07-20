/*eslint camelcase: 0*/
/*eslint no-console: 0*/

const fs = require('fs');
const path = require('path');

let manifest = {
    'author'    : 'ford153focus',
    'background': {
        'persistent': false,
        'scripts'   : [
            'background/scripts/background.js',
            'content_scripts/all_urls/js/utils.js'
        ]
    },
    'content_scripts': [],
    'description'    : 'Make the web better',
    'icons'          : {
        '16' : 'icons/bund16.jpg',
        '48' : 'icons/bund48.jpg',
        '128': 'icons/bund128.jpg'
    },
    'manifest_version': 2,
    'name'            : 'Monkey 15',
    'permissions'     : [
        'notifications'
    ],
    'web_accessible_resources': [
        'web_accessible_resources/*',
        'lib/*'
    ]
};

let content_scripts_dir = path.join(__dirname, '/content_scripts/');

for (let item of fs.readdirSync(content_scripts_dir)) {
    let contentScriptManifestPath = path.join(__dirname, '/content_scripts/' + item + '/manifest.json');
    if (fs.existsSync(contentScriptManifestPath) === true) {
        let contentScriptManifest = JSON.parse(fs.readFileSync(contentScriptManifestPath, 'utf8'));

        if (contentScriptManifest.content_scripts) {
            manifest.content_scripts = manifest.content_scripts.concat(contentScriptManifest.content_scripts);
        }

        if (contentScriptManifest.web_accessible_resources) {
            manifest.web_accessible_resources = manifest.web_accessible_resources.concat(contentScriptManifest.web_accessible_resources);
        }
    }
}

function generateForFirefox() {
    console.log('Generating manifest for Firefox');

    manifest.applications = {
        'gecko': {
            'id'                : 'monkey15@ford-rt.com',
            'strict_min_version': '60.0'
        }
    };

    let d = new Date();
    manifest.version = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}rc${d.getHours()}`;

    const webExt = require('web-ext');
    webExt.util.logger.consoleStream.makeVerbose();
    webExt.cmd.build({
        artifactsDir : './web-ext-artifacts',
        ignoreFiles  : [],
        overwriteDest: true,
        sourceDir    : '.'
    }, {}).then(() => {
        return console.log('built by webExt')
    });
}

function generateForChrome() {
    console.log('Generating manifest for Google Chrome');

    let d = new Date();
    manifest.version = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}.${d.getHours()}`;
}

switch (process.argv[2]) {
case '--firefox':
    generateForFirefox();
    break;
case '--chrome':
    generateForChrome();
    break;
default:
    console.log('No valid browser specified');
}

fs.writeFileSync('manifest.json', JSON.stringify(manifest));
