var _ = require('underscore');
var ServerError = require('../ServerError');

var ResponseHelper = module.exports;

var _buildResponse = function(res, error, data, header, beforeEndResponse) {
    var json = {};

    if (error) {
        if (!error.errorCode) {
            error = ServerError.getUnKnownError(error);

        }
        json = {
            errorInfo: error
        };
    } else {
        json = data;
    }

    if (header != null) {
        _.each(header, function(value, key) {
            res.set(key, value);
        });
    }

    if (beforeEndResponse) {
        beforeEndResponse(json);
    }

    res.json(json);
};

ResponseHelper.buildResponse = function(res, error, data, header, beforeEndResponse) {
    _buildResponse(res, error, data, header, beforeEndResponse);
};

