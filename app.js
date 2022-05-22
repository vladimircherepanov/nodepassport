const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const UserModel = require('./model/model');
mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;
require('./auth/auth');
const routes = require('./routes/routes');
const app = express();
app.use(pino);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500); //Dhe
    res.json({ error: err });
});
app.listen(3000, () => {
    console.log('Server started on port 3000')
});