var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var chatHistory = [];

//css?
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    //   res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/chatWithBot.html');
});

http.listen(2999, () => {
    console.log('listening on *:2999');
});

io.on('connection', (socket) => {
    var connectMessage = new Date().toUTCString() + ' | System: User connected: ';
    console.log(connectMessage);
    io.emit('chat history', chatHistory);
    
    socket.on('chat message', (msg) => {
        //console.log('message received: ' + msg);
        var messageToWrite = msg;
        // var systemMessage;
        console.log("final message emitted: " + messageToWrite);
        //io.emit('chat message', newMessage);
        chatHistory.unshift(messageToWrite);
        // if (systemMessage) {
        //     chatHistory.unshift(new Date().toUTCString() + systemMessage);
        // }
        io.emit('chat history', chatHistory);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:');
        // var disconnectMessage = new Date().toUTCString() + ' | System:  User disconnected: ';
        //io.emit('chat message', newMessage);
        // chatHistory.unshift(disconnectMessage);
        // io.emit('chat history', chatHistory);
    });
});