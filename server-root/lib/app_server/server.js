// import third party
var express = require('express');
var cookieParser = require('cookie-parser');
var connect = require('connect');
var sessionMongoose = require('session-mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');
var logger = require('../runtime/logger').getLogger();
var ResponseHelper = require('./helper/ResponseHelper');

var servicesNames = [
	'user',
	'task'
];
var services = servicesNames.map(function(service) {
    return require('./app/' + service);
});


module.exports = function(config, db) {
    var app = express();
    global.config = config;
    // Set listen port
    app.listen(config.server.port);

    // =================== Setup Middleware Begin ===================
    // Set http server cross domain
    app.use(function(req, res, next) {
        // Set header for cross domain
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    // Set cookie
    app.use(cookieParser());

    // Initilize Mongo Session Store
    var SessionStore = sessionMongoose(connect);
    var session = require('express-session')({
        store: new SessionStore({
            interval: 24 * 60 * 60 * 1000,
            connection: db.getConnection(),
            modelName: 'sessionStores'
        }),
        cookie: {
            maxAge: 365 * 24 * 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false,
        secret: 'wtf!'
    });

    // Use session store
    app.use(session);
    app.use(require('./middleware/queryStringParser')); // parse GET method's queryString to json

    // parse body to parse json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Initilize checker fillter
    app.use(require('./middleware/permissionValidator')(services));

    // Set error handler
    app.use(_errorHandleMiddleware);
    // =================== Setup Middleware End ===================

    // Set route
    services.forEach(function(service) {
        var fullpath = '/' + config.server.context + '/';
        if (service.rootPath != null && service.rootPath.length > 0) {
            fullpath += service.rootPath;
        }
        for (var key in service.actions) {

            var action = service.actions[key];

            var actionPath = fullpath;
            if (action.path === null) {
                actionPath += '/' + key;
            } else if (action.path.length > 0) {
                actionPath += '/' + action.path;
            }

            var method = action.method.toUpperCase();
            var callback = action.execute;
            if (method === 'GET') {
                app.route(actionPath).get(callback);
            } else if (method === 'POST') {
                app.route(actionPath).post(callback);
            } else if (method === 'PUT') {
                app.route(actionPath).put(callback);
            } else if (method === 'DELETE') {
                app.route(actionPath).delete(callback);
            }
        }

        logger.info('APP Server Startup');
    });
};

var _errorHandleMiddleware = function(error, req, res, next) {
    if (!error) {
        next();
    } else {
        res.status(500);
        ResponseHelper.buildResponse(res, error);
    }
};
