require('./support.js');

function endpointsWithoutFQDN(element) {
    return element.requireFQDN == undefined || element.requireFQDN == 0;
}

function endpointsWithFQDN(element) {
    return element.requireFQDN == undefined || element.requireFQDN == 1;
}

var host = process.env.ENDPOINT_HOST,
    pathsFile = process.env.ENDPOINT_PATHS,
    site_uri = process.env.SITE_URI;

if (typeof host == 'undefined') process.exit(0);
if (typeof pathsFile == 'undefined') process.exit(0);
if (typeof site_uri == 'undefined' || site_uri == '' ) site_uri = host;

var pathsList = yaml.safeLoad(fs.readFileSync(pathsFile, 'utf8'));

var testHttpCode = require("./methods/httpstatus.js").httpcode;

if ( site_uri == host ) {
    pathsList = pathsList.filter( endpointsWithoutFQDN );
} else {
    pathsList = pathsList.filter( endpointsWithFQDN );
}

suite("Checking paths for host " + host + ' with the sitename ' + site_uri, function () {
    var testHttpResponse = testHttpCode;
    pathsList.forEach(function (dataItem) {

        var http_headers = '';
        if (dataItem.secure === 1) {
            http_headers = {
                'Host': site_uri
            };
        }

        describe("Checking status " + dataItem.statusCode.toString() + " for " + dataItem.path, testHttpResponse(dataItem, host, http_headers));
    });
});
