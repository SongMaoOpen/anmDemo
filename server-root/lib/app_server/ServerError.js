var util = require('util');

var ServerError = function(errorCode, description, err) {
    Error.call(this, 'server error');
    this.errorCode = errorCode;
    this.description = description || _codeToString(errorCode);
    this.domain = 'ServerError';
    if (errorCode === 9999) {
        err = err || new Error();
        this.stack = err.stack;
        require('../runtime/loggers').get('caught-exceptions').error({
            'errorCode': this.errorCode,
            'stack': (this.stack || '').split('\n')
        });
    }
};

util.inherits(ServerError, Error);

module.exports = {
    ERR_NOT_LOGGED_IN: new ServerError(9000, 'ERR_NOT_LOGGED_IN')
    ERR_UNKNOWN: new ServerError(9999, 'ERR_UNKNOWN'),
};

