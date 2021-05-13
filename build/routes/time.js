"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeController_1 = require("../controllers/timeController");
const router = express_1.Router();
router.get('/api/:id', timeController_1.getTimes);
router.post('/api/', timeController_1.postTime);
router.put('/api/:id', timeController_1.putTime);
router.delete('/api/:id', timeController_1.deleteTime);
exports.default = router;
