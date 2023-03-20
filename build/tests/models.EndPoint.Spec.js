"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../database"));
var user_model_1 = __importDefault(require("../models/user.model"));
var index_1 = __importDefault(require("../index"));
var product_model_1 = __importDefault(require("../models/product.model"));
var order_model_1 = __importDefault(require("../models/order.model"));
var orderModel = new order_model_1.default();
var productModel = new product_model_1.default();
var userModel = new user_model_1.default();
var request = (0, supertest_1.default)(index_1.default);
var token = '';
describe('Test API EndPoints ', function () {
    var product = {
        name: 'Keyb-1',
        price: '1000',
        category: 'Keyborads',
    };
    var user = {
        username: 'mohsa',
        first_name: 'mohamed',
        last_name: 'saleh',
        password: '1234',
    };
    var order = {
        user_id: '1',
        status: 'Active',
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var create, createP, createO;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    create = _a.sent();
                    user.id = create === null || create === void 0 ? void 0 : create.id;
                    return [4 /*yield*/, productModel.create(product)];
                case 2:
                    createP = _a.sent();
                    product.id = createP === null || createP === void 0 ? void 0 : createP.id;
                    return [4 /*yield*/, orderModel.createOrder(order)];
                case 3:
                    createO = _a.sent();
                    order.id = createO === null || createO === void 0 ? void 0 : createO.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = "DELETE from order_product; ALTER SEQUENCE order_product_id_seq RESTART WITH 1; DELETE from products; ALTER SEQUENCE products_id_seq RESTART WITH 1; DELETE from orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; DELETE from users; ALTER SEQUENCE users_id_seq RESTART WITH 1;";
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release;
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test Authenticate method', function () {
        it('Should be able to Authenticate to get token ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, userToken, _a, id, username;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users/auth')
                            .set('Content-type', 'application/json')
                            .send({
                            username: 'mohsa',
                            password: '1234',
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        userToken = res.body.data.token;
                        _a = res.body.data.user, id = _a.id, username = _a.username;
                        expect(id).toEqual(user.id);
                        expect(username).toBe('mohsa');
                        token = userToken;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Error should be occurred (wrong login data)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users/auth')
                            .set('Content-type', 'application/json')
                            .send({
                            username: 'wrong',
                            password: 'wrong',
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test API Endpoint for orders', function () {
        it('Should create new order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, user_id, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/orders')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            user_id: '1',
                            status: 'Active',
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, user_id = _a.user_id, status = _a.status;
                        expect(user_id).toBe('1');
                        expect(status).toBe('Active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should get order by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/orders/".concat(order.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.user_id).toBe('1');
                        expect(res.body.data.status).toBe('Active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should add product to order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post("/api/orders/".concat(user.id, "/products"))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            quantity: 10,
                            order_id: '1',
                            product_id: '1',
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should delete ordered product by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            //delete ordered product i just created with id 2
                            .delete("/api/orders/".concat(order.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.id).toBe(1);
                        expect(res.body.data.quantity).toBe(10);
                        expect(res.body.data.product_id).toBe('1');
                        expect(res.body.data.order_id).toBe('1');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test API Endpoint for products', function () {
        it('Should create new product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, name, price, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/products')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            name: 'Keyb-2',
                            price: '1500',
                            category: 'Keyborads',
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, name = _a.name, price = _a.price, category = _a.category;
                        expect(name).toBe('Keyb-2');
                        expect(price).toBe('1500');
                        expect(category).toBe('Keyborads');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should get all products from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/products/')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should get product by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/products/".concat(product.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.name).toBe('Keyb-1');
                        expect(res.body.data.price).toBe('1000');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should get product by category from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/products/category/".concat(product.category))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.name).toBe('Keyb-1');
                        expect(res.body.data.price).toBe('1000');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should update product by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, name, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .patch("/api/products/".concat(product.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send(__assign(__assign({}, product), { name: 'Keyb-1update', price: '2000' }))];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, name = _a.name, price = _a.price;
                        expect(name).toBe('Keyb-1update');
                        expect(price).toBe('2000');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should delete product by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete("/api/products/2")
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.id).toBe(2);
                        expect(res.body.data.name).toBe('Keyb-2');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test API Endpoint for users', function () {
        it('Should create new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, username, first_name, last_name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            username: 'test142',
                            first_name: 'mohamed2',
                            last_name: 'saleh2',
                            password: '1234',
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, username = _a.username, first_name = _a.first_name, last_name = _a.last_name;
                        expect(username).toBe('test142');
                        expect(first_name).toBe('mohamed2');
                        expect(last_name).toBe('saleh2');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should get all users from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/users/')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should get user by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/users/".concat(user.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.username).toBe('mohsa');
                        expect(res.body.data.first_name).toBe('mohamed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should update user by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, first_name, last_name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .patch("/api/users/".concat(user.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send(__assign(__assign({}, user), { first_name: 'mohamedupdate', last_name: 'salehupdate' }))];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, first_name = _a.first_name, last_name = _a.last_name;
                        expect(first_name).toBe('mohamedupdate');
                        expect(last_name).toBe('salehupdate');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should delete user by ID from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            //delete user i just created with id 2
                            .delete("/api/users/2")
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.id).toBe(2);
                        expect(res.body.data.first_name).toBe('mohamed2');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
