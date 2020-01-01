const winston = require('winston')

const myFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  //
  // The simple format outputs
  // `${level}: ${message} ${[Object with everything else]}`
  //
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  //
  // Alternatively you could use this custom printf format if you
  // want to control where the timestamp comes in your final message.
  // Try replacing `format.simple()` above with this:
  //
  // format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
)

const logger = winston.createLogger({
    level: 'debug',
    format: myFormat,
    defaultMeta: {service: 'user-service'},
    transports: [
      new winston.transports.File({ filename: './logs/error.log', level: 'error', maxsize: 1000000, maxFiles: 5 },),
      new winston.transports.File({ filename: './logs/combined.log', maxsize: 1000000, maxFiles: 5 })
    ]
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: myFormat
    }));
  }else{
      console.log("Production environment supressing console logs")
  }

  module.exports = logger