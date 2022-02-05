"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const unit_routes_1 = __importDefault(require("../routes/unit.routes"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/units', unit_routes_1.default);
const start = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || '');
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    }
    catch (e) {
        console.log('Server error', e);
        process.exit(1);
    }
};
app.get('/', (req, res) => {
    res.send('Start server');
});
start();
