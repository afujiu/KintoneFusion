const request = require('request');
var URL = 'http://192.168.90.174:8080/knowledge/api/knowledges/?limit=1000&offset=1&keyword=ビルド';
request.get({
    uri: URL,
    headers: {
        'Content-type': 'application/json',
        'PRIVATE-TOKEN':'NP10XgTfYLM18Gp955KJwJVihCYoPzSdcHate17b5yEDpG4oRwfX1eaHGpX3Pgmw'},
    qs: {
    },
    json: true
}, function(err, req, data){
    console.log(data)
})