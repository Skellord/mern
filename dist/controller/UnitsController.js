"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unit_model_1 = require("../models/unit.model");
class UnitsController {
    async getOne(req, res) {
        try {
            const unit = await unit_model_1.UnitModel.findById(req.params.id);
            res.json(unit);
        }
        catch (e) {
            res.status(404).json(e);
        }
    }
    async getAll(req, res) {
        try {
            const units = await unit_model_1.UnitModel.find();
            res.json(units);
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
}
exports.default = new UnitsController();
