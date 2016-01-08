var winston = require('winston');

var _logger;

var _defaultTransport = {
    level: 'debug',
    colorize: true,
    timestamp: function() {
        var moment = require('moment');
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    formatter: function(options) {
        return options.timestamp() + ' ' + options.level.toUpperCase() + ' - ' +
            (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
    }
};

var _init = function(config) {
    var options = {
        level: 'debug',
        exitOnError: false,
        transports: []
    };

    if (config.logger.console) {
        var consoleConfig = _defaultTransport;
        consoleConfig.level = config.logger.console.level || _defaultTransport.level;
        options.transports.push(new (winston.transports.Console)(consoleConfig));
    }

    if (config.logger.file) {
        var fileConfig = _defaultTransport;
        fileConfig.level = config.logger.file.level || _defaultTransport.level;
        fileConfig.filename = config.logger.file.filename;
        options.transports.push(new (require('winston-daily-rotate-file'))(fileConfig));
    }

    _logger = new winston.Logger(options);
};

var _getLogger = function() {
    return _logger;
};

module.exports = {
    init: _init,
    getLogger: _getLogger
};

