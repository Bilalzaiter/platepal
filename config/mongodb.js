const mongoose = require('mongoose')
const { logger, logEvents } = require('../services/logger')
const url = process.env.DB_URL;
const db = async () => {
    try {
        await mongoose
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log('Database connected !!!');
                logEvents("Database connected", 'connection.log');
            })
            .catch((err) => {
                // logger.error('Database NOT CONNECTED');
                logEvents(`Error: ${err.message}`, 'connection.log');
                console.error(err);
            });
    } catch (err) {
        console.log(err)
    }
}
module.exports = db