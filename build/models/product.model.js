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
var database_1 = __importDefault(require("../database"));
var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    //Create Product
    ProductModel.prototype.create = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO products (name, price, category)\n        values ($1, $2, $3) returning id, name, price, category";
                        return [4 /*yield*/, connection.query(sql, [
                                p.name,
                                p.price,
                                p.category,
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Unable to create (".concat(p.name, "): ").concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // //Get All products
    ProductModel.prototype.getAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id, name, price, category FROM products";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Retrieving error ".concat(error_2.message, ")"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // //Get products by category
    ProductModel.prototype.getProByCate = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_1, result_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT category FROM products WHERE category=$1";
                        return [4 /*yield*/, connection.query(sql, [category])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_1 = "SELECT * FROM products WHERE category=$1";
                        return [4 /*yield*/, connection.query(sql_1, [category])];
                    case 3:
                        result_1 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_1.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        throw new Error("Unable to get products with category-".concat(category, ", ").concat(error_3.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // //Get Specific product
    ProductModel.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_2, result_2, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id FROM products WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_2 = "SELECT * FROM products WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql_2, [id])];
                    case 3:
                        result_2 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_2.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        throw new Error("Unable to get product with ID:".concat(id, ", ").concat(error_4.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // //Update product
    ProductModel.prototype.updateProduct = function (id, name, price, category) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_3, result_3, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id FROM products WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_3 = "UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category";
                        return [4 /*yield*/, connection.query(sql_3, [
                                name,
                                price,
                                category,
                                id,
                            ])];
                    case 3:
                        result_3 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_3.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        throw new Error("Unable to update product: ".concat(name, " , ").concat(error_5.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // //Delete product
    ProductModel.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_4, result_4, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id FROM products WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_4 = "DELETE FROM products WHERE id=$1 RETURNING id, name, price, category";
                        return [4 /*yield*/, connection.query(sql_4, [id])];
                    case 3:
                        result_4 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_4.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        throw new Error("Unable to delete product ".concat(id, ", ").concat(error_6.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ProductModel;
}());
exports.default = ProductModel;
