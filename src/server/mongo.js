const mongoose = require('mongoose');
const db = require("./config/database.js");
const config = require("./config/config.js");

function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(db.database, {
            auth: {
            user: config.DB_USER_NAME,
            password: config.DB_PASSWORD,
            }
        })
        .then(() => console.log('connection successful'))
        .catch((err) => console.error(err));
}

mongoose.connection.on('connected', () => {
    console.log("Connected to database " + db.database);
});
mongoose.connection.on('error', () => {
    console.log("Error connecting to database " + db.database);
});

module.exports = {
  connect,
  mongoose
};