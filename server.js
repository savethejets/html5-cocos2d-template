var express = require('express'),
    util = require("util"),
    io = require("socket.io"),
    Player = require("./Player").Player,
    server = express();

server.use('/cocos2d', express.static(__dirname + '/cocos2d') );
server.use('/cocosDenshion', express.static(__dirname + '/cocosDenshion') );
server.use('/classes', express.static(__dirname + '/classes') );
server.use('/resources', express.static(__dirname + '/resources') );

server.get('/', function(req,res){
    res.sendfile('index.html');
    console.log('Sent index.html');
});

server.get('/api/hello', function(req,res){
    res.send('Hello World');
});

var port = process.env.PORT || 2000;
server.listen(port);

console.log('process started on port = %d', port);