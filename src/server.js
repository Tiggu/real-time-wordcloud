var logger = require('./logger');
var bodyParser = require('body-parser')
var app = require('express')();
var cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);

let listOfWords = ""

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        logger.debug(msg)
      listOfWords += ` ${msg}`
      io.emit('chat message', listOfWords);
    });
    socket.on('disconnect', function(){
        logger.debug('user disconnected');
      });
  });

setInterval(() => {
    logger.debug(`emitting words now: ${listOfWords}`)
    io.emit('words', listOfWords)
}, 5000);

app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/iframe', (req,res) => {
    res.sendFile(__dirname + "/iframe.html")
})

server.listen(3000, function() {
    logger.info('listening on *:3000');
});
