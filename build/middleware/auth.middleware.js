"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var errorHandller = function (next) {
    var error = new Error('You have to login');
    error.status = 401;
    next(error);
};
var validateTokenMiddleWare = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decode = jsonwebtoken_1.default.verify(token, config_1.default.token);
                if (decode) {
                    next();
                }
                else {
                    errorHandller(next);
                }
            }
            else {
                errorHandller(next);
            }
        }
        else {
            errorHandller(next);
        }
    }
    catch (error) {
        errorHandller(next);
    }
};
exports.default = validateTokenMiddleWare;
