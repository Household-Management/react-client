"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const auth_1 = require("./auth");
const userData_1 = require("./userData");
const status_1 = require("./status");
exports.default = redux_1.combineReducers({
    auth: auth_1.default,
    userData: userData_1.default,
    status: status_1.default,
});
