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
var product_model_1 = __importDefault(require("../../models/product.model"));
var productModel = new product_model_1.default();
describe('Test Product Model', function () {
    describe('Test methods exist', function () {
        it('Should have createP roduct method', function () {
            expect(productModel.create).toBeDefined();
        });
        it('Should have GetAllProducts method', function () {
            expect(productModel.getAllProducts).toBeDefined();
        });
        it('Should have GetOneproduct method', function () {
            expect(productModel.getOne).toBeDefined();
        });
        it('Should have GetProByCate method', function () {
            expect(productModel.getProByCate).toBeDefined();
        });
        it('Should have UpdateProduct method', function () {
            expect(productModel.updateProduct).toBeDefined();
        });
        it('Should have DeleteProduct method', function () {
            expect(productModel.deleteProduct).toBeDefined();
        });
    });
    describe('Test ProductModel functionality', function () {
        var product = {
            name: 'Keyb-1',
            price: '1000',
            category: 'Keyborads',
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createP;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create(product)];
                    case 1:
                        createP = _a.sent();
                        product.id = createP === null || createP === void 0 ? void 0 : createP.id;
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
                        sql = "DELETE from products; ALTER SEQUENCE products_id_seq RESTART WITH 1;";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create function, should return created prodcut', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create({
                            name: 'keyb-2',
                            price: '1000',
                            category: 'Keyborads',
                        })];
                    case 1:
                        createdProduct = _a.sent();
                        expect(createdProduct).toEqual({
                            id: createdProduct === null || createdProduct === void 0 ? void 0 : createdProduct.id,
                            name: 'keyb-2',
                            price: '1000',
                            category: 'Keyborads',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetAll function, should return all products from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getAllProducts()];
                    case 1:
                        products = _a.sent();
                        expect(products.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetByID function, should return prodcut with passed id, from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getOne(product === null || product === void 0 ? void 0 : product.id)];
                    case 1:
                        returnedProduct = _a.sent();
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.id).toBe(product.id);
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.name).toBe(product.name);
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.price).toBe(product.price);
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.category).toBe(product.category);
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetByCategory function, should return prodcut with passed category, from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getProByCate(product.category)];
                    case 1:
                        returnedProduct = _a.sent();
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.id).toBe(product.id);
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.name).toBe(product.name);
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.price).toBe(product.price);
                        expect(returnedProduct === null || returnedProduct === void 0 ? void 0 : returnedProduct.category).toBe(product.category);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update function, should return updated product with passed id, from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var up, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        up = { name: 'TV-1', price: '8000', category: 'TV' };
                        return [4 /*yield*/, productModel.updateProduct(product.id, up.name, up.price, up.category)];
                    case 1:
                        updatedProduct = _a.sent();
                        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.id).toBe(product.id);
                        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.name).toBe('TV-1');
                        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.price).toBe('8000');
                        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.category).toBe('TV');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete function, should delete product with passed id, from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.deleteProduct(product === null || product === void 0 ? void 0 : product.id)];
                    case 1:
                        deletedProduct = _a.sent();
                        expect(deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.id).toBe(product.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
