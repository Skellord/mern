"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: mongoose_1.Types.ObjectId, required: true, unique: true },
    name: { type: String },
    localized_name: { type: String },
});
exports.UnitModel = (0, mongoose_1.model)('Unit', schema);
