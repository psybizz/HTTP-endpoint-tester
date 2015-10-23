require('./support.js');

// load environment file (argument take from the make command)
var indexGlobals = process.argv.indexOf('--globals');
var environment = process.argv[indexGlobals + 1];

if (typeof process.env.ENDPOINT_HOST == 'undefined') {
    module.exports = yaml.safeLoad(fs.readFileSync('./resources/general/environments/' + environment + '.yml', 'utf8'));
}
