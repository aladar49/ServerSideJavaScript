var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

/**
 * Static stuff
 */
app.use(express.static('static'));

/**
 * Session above all
 */
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));


/**
 * Let's create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    return next();
});

/**
 * Include all the routes
 */
require('./routes/reservation')(app);
require('./routes/outside')(app);


/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we have a problem!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    console.log('Hello :3000');
});