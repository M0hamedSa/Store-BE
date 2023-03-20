"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_routes_1 = __importDefault(require("./api/users.routes"));
var products_routes_1 = __importDefault(require("./api/products.routes"));
var category_routes_1 = __importDefault(require("./api/category.routes"));
var order_routes_1 = __importDefault(require("./api/order.routes"));
var routes = (0, express_1.Router)();
// /api/users/Routes(/)
routes.get('/', function (req, res) {
    res.send('main api');
}),
    routes.use('/users', users_routes_1.default);
routes.use('/products', products_routes_1.default);
routes.use('/products/category', category_routes_1.default);
routes.use('/orders', order_routes_1.default);
exports.default = routes;
