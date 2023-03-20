"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV, PGHOST = _a.PGHOST, PGPORT = _a.PGPORT, PGDATABASE = _a.PGDATABASE, PGDATABASETEST = _a.PGDATABASETEST, PGUSER = _a.PGUSER, PGPASSWORD = _a.PGPASSWORD, TOKENSECRET = _a.TOKENSECRET, BCRYPTPASS = _a.BCRYPTPASS, SALTROUNDS = _a.SALTROUNDS;
exports.default = {
    port: PORT,
    host: PGHOST,
    dbPort: PGPORT,
    database: NODE_ENV === 'dev' ? PGDATABASE : PGDATABASETEST,
    user: PGUSER,
    password: PGPASSWORD,
    token: TOKENSECRET,
    pepper: BCRYPTPASS,
    salt: SALTROUNDS,
};
