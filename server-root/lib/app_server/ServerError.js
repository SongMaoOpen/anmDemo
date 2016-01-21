var util = require('util');

var ServerError = function(errorCode, description, err) {
    Error.call(this, 'server error');
    this.errorCode = errorCode;
    this.description = description || _codeToString(errorCode);
    this.domain = 'ServerError';
    if (errorCode === 9999) {
        err = err || new Error();
        this.stack = err.stack;
    }
};

var _getUnKnownError =  function(error) {
    if (error instanceof Error) {
        return new ServerError(9999, 'ERR_UNKNOWN', error);
    } else {
        return new ServerError(9999, error || 'ERR_UNKNOWN');
    }
};

util.inherits(ServerError, Error);

module.exports = {
    ERR_NOT_LOGGED_IN: new ServerError(9000, 'Has not logged in.'),
    ERR_INVALID_USER: new ServerError(9001, 'Username or password invaild.'),
    ERR_NOT_ENOUGH_PARAM: new ServerError(9002, 'Parameter is not enough.'),
    ERR_USER_IS_EXISTS: new ServerError(9003, 'User is exists.'),
    ERR_TOKEN: new ServerError(9004, 'Invalid token.'),
    ERR_UKNOWN: new ServerError(9999, 'Unknown Error.'),
    getUnKnownError: _getUnKnownError
};

