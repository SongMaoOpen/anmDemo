module.exports = function(req, res, next) {
    if (req.query.pageNo == null) {
        req.query.pageNo = 0;
    }
    if (req.query.pageSize == null) {
        req.query.pageSize = 5;
    }
    next();
};
