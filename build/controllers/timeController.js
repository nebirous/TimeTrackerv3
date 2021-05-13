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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTime = exports.putTime = exports.postTime = exports.getTimes = void 0;
const models_1 = __importDefault(require("../models"));
/** Gets times from a id user */
const getTimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    const time = yield models_1.default.Time.findByPk(idUser);
    if (time) {
        res.json(time);
    }
    else {
        res.status(404).json({
            msg: `Not Found user with id ${idUser}`
        });
    }
});
exports.getTimes = getTimes;
const postTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const time = models_1.default.Time.build(body);
        yield time.save();
        res.json(time);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator',
            body
        });
    }
    ;
});
exports.postTime = postTime;
const putTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const time = yield models_1.default.Time.findByPk(id);
        if (!time) {
            return res.status(404).json({
                msg: 'There is no user with id ' + id
            });
        }
        yield time.update(body);
        res.json(time);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        });
    }
    ;
});
exports.putTime = putTime;
const deleteTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const time = yield models_1.default.Time.findByPk(id);
    if (!time) {
        return res.status(404).json({
            msg: 'Time not found with id' + id
        });
    }
    yield time.update({ status: false });
    res.json(time);
});
exports.deleteTime = deleteTime;
