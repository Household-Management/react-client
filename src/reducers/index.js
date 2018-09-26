"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const tasks_1 = require("./tasks");
const redux_1 = require("redux");
exports.default = redux_1.combineReducers({
    auth: auth_1.default,
    tasks: tasks_1.default
});
