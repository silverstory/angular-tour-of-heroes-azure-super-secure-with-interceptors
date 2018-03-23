const express = require('express');
const security = require('./security');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');

// DOTENV HERE before config/database
// require('dotenv').config();
// Preloading
// You can use the --require (-r) command line option to preload dotenv. By doing this, you do not need to require and load dotenv in your application code. This is the preferred approach when using import instead of require.
// $ node -r dotenv/config your_script.js
// The configuration options below are supported as command line arguments in the format dotenv_config_<option>=value
// $ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/your/env/vars

const db = require("./config/database.js");
const config = require("./config/config.js");

mongoose.connect(db.database, {
    auth: {
      user: config.DB_USER_NAME,
      password: config.DB_PASSWORD,
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

mongoose.connection.on('connected', () => {
    console.log("Connected to database " + db.database);
});
mongoose.connection.on('error', () => {
    console.log("Error connecting to database " + db.database);
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
