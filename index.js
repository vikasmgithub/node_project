const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const passport = require('passport');


require("./models/user");
require("./services/passport_local")(passport);
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI, function(err, database) {
  if (err) return console.log(err);
  return console.log("connected to mongo");
});

var db1 = mongoose.connection;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




require("./routes/authRoutes")(app);

const PORT = 5000 || process.env.PORT;
app.listen(PORT);
