"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UnitsController_1 = __importDefault(require("../controller/UnitsController"));
const unitRouter = (0, express_1.Router)();
unitRouter.get('/', UnitsController_1.default.getAll);
unitRouter.get('/:id', UnitsController_1.default.getOne);
exports.default = unitRouter;
