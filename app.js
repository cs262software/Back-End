var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var users = require('./routes/users');
var roles = require('./routes/roles');
var files = require('./routes/files');
var plays = require('./routes/plays');
var characters = require('./routes/characters');
var blocking = require('./routes/blocking');
var props = require('./routes/props');
var notes = require('./routes/notes');
var lights = require('./routes/lights');
var sounds = require('./routes/sounds');

// Define a middleware to handle authentication.
var jwt = require('jsonwebtoken');
// Make sure this is the same as the one used to generate the JWTs in userManager.js.
var jwtPrivateKey = "OUelfRXH4bVdhVt9rAuKmG4aMsZvJDRmqs1uL9jH";
function authenticationMiddleware (req, res, next) {
    // See if there is any token present in the http headers.
    var authToken = req.header("X-Auth-Token");
    if (!authToken) {
        // Unauthorized.
        res.status(401).send();
    } else {
        // An auth token was passed, so evaluate it.
        jwt.verify(authToken, jwtPrivateKey, function(err, decoded) {
            // FYI: Token data can be retrieved as decoded.dataKey...
            if (err) {
                // Unauthorized.
                res.status(401).send();
            } else {
                // Move on to the next handler, if authenticated.
                next();
            }
        });
    }
}

// A helpful middleware to exclude routes from other middleware.
function unless(path, middleware) {
    return function(req, res, next) {
        if (req.path.includes(path)) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

// Create the main framework object.
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// server requirements
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Authenticate incoming requests.
// Ignore user routes because unauthenticated users must be able to log in.
app.use(unless('/api/users', authenticationMiddleware));

// base routes
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/files', files);
app.use('/api/plays', plays);
app.use('/api/characters', characters);
app.use('/api/blocking', blocking);
app.use('/api/props', props);
app.use('/api/notes', notes);
app.use('/api/lights', lights);
app.use('/api/sounds', sounds);
app.use('/api/schedule', schedule);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(3001, function() {
    console.log('Ready on port %d', server.address().port);
});

module.exports = app;
