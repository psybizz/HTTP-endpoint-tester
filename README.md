HTTPEndpointTester
==================

A HTTP endpoint tester using node.js, inspired by the [node-test-tutorial](https://github.com/DBeath/node-test-tutorial) of David Beath and the talk of Danny Dinneen at the 2014 edition of the Endpoint conference.

The tool is written to be used in a CI pipeline with jenkins, to test endpoints of rest(ful) API's. That's why it depends on environment variables, this makes it easy to use the tool in a CI pipeline.

## Usage
### initialise environment
`
npm install
`

This will install/update all the required modules for running the tests

Also a composer wrapper is provided, implemented to keep our own jenkins as stupid as possible ;)

### Run tests
`
ENDPOINT_PATHS=<path/to/paths/file.json> ENDPOINT_HOST=<host>:<port> SITE_URI=<FQDN> ./node_modules/.bin/mocha --ui tdd
`

## Adding paths to test
Select the project in resources
Open paths.json
and add the following stanza:

``` json
[
    {
            "path": "/api/info",
            "method": "GET",
            "headers": {
                "header1": "value1",
                "header2": "value2"
            },
            "statusCode": [200, 302],
            "public": 1,
            "secure": 0,
            "requireFQDN": 0,
            "timeout": 500
    },
    {
        // another stanza
    }
]
```

path: path to test  
method: GET,POST, PUT or PATCH  
statuscode: [statuscode(s)]  
public: should endpoint be available in production  
secure: use http or https  (needs to be implemented)
timeout: timeout in milliseconds  
requireFQDN: mark a test as optional or required when an site uri has been specified. ( optional parameter )

public and secure are not implemented yet.

## Resources
  - [Request class for node.js](https://github.com/mikeal/request)
  - [Mocha test framework](http://http://mochajs.org/)
  - [Chai assertion library](https://github.com/chaijs/chai)

## Todo
 - implement https support

