// JavaScript source code
console.log("Hello World!!!");

//store reference of http library to http variable
var http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(200, { "Context-Type": "text/plain" });
    response.end("Hello World!!!");
});

server.listen(8000);
console.log("Server is running on http://localhost:8000");

