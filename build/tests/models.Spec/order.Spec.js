"use strict";
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
var database_1 = __importDefault(require("../../database"));
var order_model_1 = __importDefault(require("../../models/order.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var product_model_1 = __importDefault(require("../../models/product.model"));
var productModel = new product_model_1.default();
var userModel = new user_model_1.default();
var orderModel = new order_model_1.default();
describe('Test Order Model', function () {
    describe('Test methods exist', function () {
        it('Should have create order method', function () {
            expect(orderModel.createOrder).toBeDefined();
        });
        it('Should have AddProducts method', function () {
            expect(orderModel.addProduct).toBeDefined();
        });
        it('Should have getOrderByID method', function () {
            expect(orderModel.getOne).toBeDefined();
        });
        it('Should have deleteAddProduct method', function () {
            expect(orderModel.deleteAddProduct).toBeDefined();
        });
    });
    describe('Test OrderModel functionality', function () {
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
        it('Create function, should return created order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.createOrder({
                            user_id: user.id,
                            status: 'Active',
                        })];
                    case 1:
                        createdOrder = _a.sent();
                        expect(createdOrder).toEqual({
                            id: createdOrder === null || createdOrder === void 0 ? void 0 : createdOrder.id,
                            user_id: '1',
                            status: 'Active',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('AddProduct function, should return added order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var addedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.addProduct({
                            quantity: 10,
                            order_id: '1',
                            product_id: '1',
                        })];
                    case 1:
                        addedProduct = _a.sent();
                        expect(addedProduct).toEqual({
                            id: addedProduct === null || addedProduct === void 0 ? void 0 : addedProduct.id,
                            quantity: 10,
                            order_id: '1',
                            product_id: '1',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetByID function, should return added product with passed id, from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedaddProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.getOne(order === null || order === void 0 ? void 0 : order.id)];
                    case 1:
                        returnedaddProduct = _a.sent();
                        expect(returnedaddProduct === null || returnedaddProduct === void 0 ? void 0 : returnedaddProduct.id).toBe(order.id);
                        expect(returnedaddProduct === null || returnedaddProduct === void 0 ? void 0 : returnedaddProduct.user_id).toBe(order.user_id);
                        expect(returnedaddProduct === null || returnedaddProduct === void 0 ? void 0 : returnedaddProduct.status).toBe(order.status);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete function, should delete ordered product with passed id, from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedorderedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.deleteAddProduct(user.id)];
                    case 1:
                        deletedorderedProduct = _a.sent();
                        expect(deletedorderedProduct === null || deletedorderedProduct === void 0 ? void 0 : deletedorderedProduct.id).toBe(product.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
