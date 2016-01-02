// import modules
var mongoose = require('mongoose');

module.exports = {
    connect: function(config) {
        // set mongoose connect options
        var opts = {
            server: {
                poolSize: config.poolSize,
                socketOptions: {
                    keepAlive: 1
                },
            },
            user: config.user,
            pass: config.passwd
        };

        // set mongodb connect url
        var mongodbUrl = 'mongodb://' + config.url + ':' + config.port + '/' + config.schema;

        // connect mongodb
        mongoose.connect(mongodbUrl, opts);
    },
    getConnection: function() {
        return mongoose.connection;
    }
};
