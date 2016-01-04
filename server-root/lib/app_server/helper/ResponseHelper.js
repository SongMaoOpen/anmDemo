var _ = require('underscore');
var ServerError = require('../ServerError');

var ResponseHelper = module.exports;

ResponseHelper.buildResponse = function(res, error, data, beforeEndResponse) {
    var json = {};

    if (error) {
        json = {
            errorInfo: error
        };
    } else {
        json = data;
    }

    if (beforeEndResponse) {
        beforeEndResponse(json);
    }

    res.json(json);
};
