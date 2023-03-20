"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errormiddleware = function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || 'Sorry something went wrong ):';
    res.status(status).json({ status: status, message: message });
};
exports.default = errormiddleware;
