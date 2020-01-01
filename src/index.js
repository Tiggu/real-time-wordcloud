const socketServer = require('./server');
const logger = require('./logger');

socketServer.server.listen(3000, function() {
    logger.info('listening on *:3000');
});

