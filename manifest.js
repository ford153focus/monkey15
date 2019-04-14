/*eslint camelcase: 0*/
/*eslint no-console: 0*/

const fs = require('fs');
const path = require('path');
const webExt = require('web-ext').default;

let manifest = {
    'author'    : 'ford153focus',
    'background': {
        'persistent': false,
        'scripts'   : [
            'lib/background.js'
        ]
    },
    'content_scripts': [],
    'description'    : 'Make the web better',
    'icons'          : {
        '16' : 'assets/shared/img/icon/bund16.jpg',
        '48' : 'assets/shared/img/icon/bund48.jpg',
        '128': 'assets/shared/img/icon/bund128.jpg'
    },
    'manifest_version': 2,
    'name'            : 'Monkey 15',
    'permissions'     : [
        'notifications'
    ],
    'web_accessible_resources': [
        'assets/*'
    ]
};

let content_scripts_dir = path.join(__dirname, '/lib/content_scripts/');

for (let item of fs.readdirSync(content_scripts_dir)) {
    let contentScriptManifestPath = path.join(__dirname, '/lib/content_scripts/'+item+'/manifest.json');
    if (fs.existsSync(contentScriptManifestPath) === true) {
        let contentScriptManifest = JSON.parse(fs.readFileSync(contentScriptManifestPath, 'utf8'));
        manifest.content_scripts = manifest.content_scripts.concat(contentScriptManifest.content_scripts);
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
    manifest.version = `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}rc${d.getHours()}`;

    webExt.util.logger.consoleStream.makeVerbose();
    webExt.cmd.build({
        artifactsDir : './web-ext-artifacts',
        ignoreFiles  : [],
        overwriteDest: true,
        sourceDir    : '.'
    });
}

function generateForChrome() {
    console.log('Generating manifest for Google Chrome');

    let d = new Date();
    manifest.version = `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}.${d.getHours()}`;
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
