// const { format, createLogger, transports } = require('winston');
// const { timestamp, combine, printf, errors, json } = format;

// const logFormat = printf(({ level, message, timestamp, stack }) => {
//   let logMessage = `${timestamp} | ${level.toLocaleUpperCase()} | ${stack || (typeof message == 'object' ? JSON.stringify(message) :message )}`;
//   return logMessage;
// });

// const getLogger = (fileName) => {
//   const logger = createLogger({
//     format: combine(
//       timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//       errors({ stack: true }),
//       json(),
//       logFormat,
//     ),
//     transports: [
//         new transports.File({ filename: `./logs/${fileName}.log` }),
//         new transports.File({ filename: `./logs/all.log` }),
//         new transports.Console(),
//     ],
//   });

//   return logger;
// };

// module.exports = getLogger;

// const { format, createLogger, transports } = require('winston');
// const { timestamp, combine, printf } = format;
// const logger = createLogger({
//   level: 'info',
//   format: combine(
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     printf(({ level, message, timestamp, stack }) => {
//       let logMessage = `${timestamp} | ${level.toLocaleUpperCase()} | ${stack || (typeof message == 'object' ? JSON.stringify(message) :message )}`;
//   return logMessage;
//     })
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'logs.log' }) // Change the filename and path if needed
//   ]
// });

// module.exports = logger;


const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
  } catch (err) {
    console.log(err)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logEvents, logger }
