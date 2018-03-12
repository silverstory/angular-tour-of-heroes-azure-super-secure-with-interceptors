const express = require('express');
const security = require('./security');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config/database.js");
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("Connected to database " + config.database);
});
mongoose.connection.on('error', () => {
    console.log("Error connecting to database " + config.database);
});

const app = express();
const port = process.env.PORT || 3000;
const publicweb = process.env.PUBLICWEB || './publicweb';

//cors middleware
app.use(cors());
// app.use(express.static(__dirname + '/public'));

//body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// ng azure security way
app.use(security());

// don't really need this code anymore... just keep it anyway.
// app.use(csrf({ cookie: true }));

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);

// kaya nag-error yung mga GET method api
// app.get('*', (req, res) => {
//   res.sendFile(`index.html`, { root: publicweb });
// });

//routes
const users = require("./routes/users");
app.use('/users',users);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
