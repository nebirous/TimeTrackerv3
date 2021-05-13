"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = express_1.Router();
router.get('/new', userController_1.newUser);
// API
router.get('/api', userController_1.getUsers);
router.get('/api/:id', userController_1.getUser);
router.post('/api', userController_1.postUser);
router.put('/api/:id', userController_1.putUser);
router.delete('/api/:id', userController_1.deleteUser);
exports.default = router;
