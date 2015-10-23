/**
* Build the test (method) with as input the configuration stanza from the json file
* for a given environment, the path is tested against the provided (base) url
*
* @var object   dataItem from json config
* @var string   url baseurl from environment variable
* @var array http_headers default header set for all requests
* @return testresult
*/
function testHttpCode(dataItem, url, http_headers) {
    return function () {
        test(dataItem.statusCode.toString() + " for " + dataItem.path, function (done) {
            this.timeout(dataItem.responseTreshold);
            request({
                uri: 'http://' + url + dataItem.path,
                method: dataItem.method,
                timeout: dataItem.responseTreshold,
                headers: extend(dataItem.headers || {}, http_headers),
                followRedirect: (dataItem.followRedirect == false ? false : true)
            }, function (error, response, body) {
                expect(error).to.be.null;
                expect(dataItem.statusCode).to.contain(response.statusCode);
                done();
            });
        });
    };
};

/* Make the method available in the global namespace */
module.exports.httpcode = testHttpCode;
