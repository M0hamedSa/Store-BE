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
var config_1 = __importDefault(require("../config"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var hashP = function (password) {
    var salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync("".concat(password).concat(config_1.default.pepper), salt);
};
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    //Create User
    UserModel.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_1, result_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT username FROM users WHERE username=$1";
                        return [4 /*yield*/, connection.query(sql, [u.username])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 3];
                        return [2 /*return*/, null];
                    case 3:
                        sql_1 = "INSERT INTO users (username, first_name, last_name, password)\n        values ($1, $2, $3, $4) returning id, username, first_name, last_name ";
                        return [4 /*yield*/, connection.query(sql_1, [
                                u.username,
                                u.first_name,
                                u.last_name,
                                hashP(u.password),
                            ])];
                    case 4:
                        result_1 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_1.rows[0]];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        throw new Error("Unable to create (".concat(u.first_name, "): ").concat(error_1.message));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //Get All
    UserModel.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id, username, first_name,last_name FROM users";
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
    //Get Specific user
    UserModel.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_2, result_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id FROM users WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_2 = "SELECT id, username, first_name,last_name FROM users WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql_2, [id])];
                    case 3:
                        result_2 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_2.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        throw new Error("Unable to get user ".concat(id, ", ").concat(error_3.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //Update user
    UserModel.prototype.updateUser = function (id, username, first_name, last_name, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_3, result_3, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id FROM users WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_3 = "UPDATE users SET username=$1, first_name=$2, last_name=$3, password=$4 WHERE id=$5 RETURNING id, username, first_name, last_name";
                        return [4 /*yield*/, connection.query(sql_3, [
                                username,
                                first_name,
                                last_name,
                                hashP(password),
                                id,
                            ])];
                    case 3:
                        result_3 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_3.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        throw new Error("Unable to update user: ".concat(first_name, " , ").concat(error_4.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //DELETE user
    UserModel.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, sql_4, result_4, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id FROM users WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        sql_4 = "DELETE FROM users WHERE id=$1 RETURNING id, username, first_name, last_name";
                        return [4 /*yield*/, connection.query(sql_4, [id])];
                    case 3:
                        result_4 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_4.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        throw new Error("Unable to delete user ".concat(id, ", ").concat(error_5.message, ")"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //Auth user
    UserModel.prototype.auth = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, hashP_1, ispassmatch, uInfo, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT password FROM users WHERE username=$1";
                        return [4 /*yield*/, connection.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        hashP_1 = result.rows[0].password;
                        ispassmatch = bcrypt_1.default.compareSync("".concat(password).concat(config_1.default.pepper), hashP_1);
                        if (!ispassmatch) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection.query("SELECT id, username, first_name, last_name FROM users WHERE username=$1", [username])];
                    case 3:
                        uInfo = _a.sent();
                        return [2 /*return*/, uInfo.rows[0]];
                    case 4:
                        connection.release();
                        return [2 /*return*/, null];
                    case 5:
                        error_6 = _a.sent();
                        throw new Error("Login error: ".concat(error_6.message));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
