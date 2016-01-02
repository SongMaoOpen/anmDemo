// import third party
var express = require('express');
var cookieParser = require('cookie-parser');
var connect = require('connect');
var sessionMongoose = require('session-mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');
var winston = require('winston');

var servicesNames = [];
var services = servicesNames.map(function(service) {
    return {
        'path': service.rootPath,
        'module': require('./app/' + service)
    };
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
        saveUninitialized: false
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
    // =================== Setup Middleware End ===================

    // Set route
    servics.forEach(function(service) {
        var serviceModule = service.module;
        var targetObject = service.path;

        var fullpath = '/' + config.server.context + '/';
        if (service.path != null || service.path.lenth > 0) {
            fullpath += service.path;
        }
        for (var key in serviceModule.actions) {

            var action = serviceModule.actions[key];

            var actionPath = fullpath;
            if (action.path === null) {
                actionPath += '/' + key;
            } else if (action.path.length > 0) {
                actionPath += '/' + action.path;
            }

            var method = action.method.toUpperCase();
            var callback = action.execute;
            if (method === 'GET') {
                app.route(fullpath).get(callback(req, res));
            } else if (method === 'POST') {
                app.route(fullpath).post(callback(req, res));
            } else if (method === 'PUT') {
                app.route(fullpath).put(callback(req, res));
            } else if (method === 'DELETE') {
                app.route(fullpath).delete(callback(req, res));
            }
        }
    });
};
