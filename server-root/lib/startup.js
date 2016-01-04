// import modules
var async = require('async');
var path = require('path');
var fs = require('fs');
var properties = require('properties');
var winston = require('winston');

// TBD log's handle

// async's useage see here: [https://github.com/caolan/async]
async.waterfall([function(callback) {
    // load config file from path
    var configPath = path.join(__dirname, 'config.properties');
    properties.parse(configPath, {
        path: true,
        namespace: true,
        variables: true
    }, callback);
}, function(config, callback) {
    // setup database connect
    var runtimeDb = require('./db_modules/db');
    runtimeDb.connect(config.mongodb);

    callback(null, runtimeDb, config);
}, function(runtimeDb, config, callback) {
    // TBD setup app'server(RESTFull)
    var server = require('./app_server/server');
    server(config, runtimeDb);
    callback();
}], function(error) {
    // TBD error handle
});
