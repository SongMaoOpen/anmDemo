// import modules
var async = require('async');
var path = require('path');
var fs = require('fs');
var properties = require('properties');
var winston = require('winston');

// async's useage see here: [https://github.com/caolan/async]
async.waterfall([function(callback) {
    // load config file from path
    var configPath = path.join(__dirname, 'config.properties');
    properties.parse(configPath, {
        path: true,
        namespaces: true,
        variables: true
    }, callback);
}, function(config, callback) {
    require('./runtime/logger').init(config);
    callback(null, config);
}, function(config, callback) {
    // setup database connect
    var runtimeDb = require('./db_modules/db');
    runtimeDb.connect(config.mongodb);

    callback(null, runtimeDb, config);
}, function(runtimeDb, config, callback) {
    var server = require('./app_server/server');
    server(config, runtimeDb);
    callback();
}], function(error) {
});
