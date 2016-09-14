var express = require('express');
var http = require('http');
var socket_io = require('socket.io');

var app = express();

var server = http.Server(app);
var io = socket_io(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
   console.log('client connected');
    socket.on('draw', function(position) {
        socket.broadcast.emit('draw', position);
    });
    
    socket.on('guess', function(guess) {
        socket.broadcast.emit('guess', guess);
    });
});
server.listen(process.env.PORT || 8080);