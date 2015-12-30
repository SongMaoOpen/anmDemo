// import modules
var async = require('async');
var path = require('path');
var fs = require('fs');
var properties = require('properties');

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
    var runtimeDb = require('./runtime/db');
    runtimeDb.connect(config.mongodb);

    callback(null, runtimeDb, config);
}, function(runtimeDb, config, callback) {
    // TBD setup app'server(RESTFull)
    callback();
}], function(error) {
    // TBD error handle
});
