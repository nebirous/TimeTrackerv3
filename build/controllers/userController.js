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
exports.newUser = exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const models_1 = __importDefault(require("../models"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.default.User.findAll({
        include: [{
                model: models_1.default.Project,
                as: "projects"
            }, {
                model: models_1.default.Time,
                as: "time"
            }]
    }).then((result) => res.json(result)).catch((err) => console.error(err));
    // const users = await db.User.findAll();
    // res.json({users});
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    res.status(200).json({
        msg: 'User is +' + userId
    });
    // const user = await db.User.findByPk(userId);
    // if(user){
    //     res.json(user);
    // } else {
    //     res.status(404).json({
    //         msg: `Not Found user with id ${ userId }`
    //     })
    // }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeMail = yield models_1.default.User.findOne({
            where: {
                email: body.email
            }
        });
        if (existeMail) {
            return res.status(400).json({
                msg: 'User already exists with email' + body.email
            });
        }
        const user = models_1.default.User.build(body);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        });
    }
    ;
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield models_1.default.User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'There is no user with id ' + id
            });
        }
        const existeMail = yield models_1.default.User.findOne({
            where: {
                email: body.email
            }
        });
        if (existeMail) {
            return res.status(400).json({
                msg: 'User already exists with email' + body.email
            });
        }
        else {
            yield user.update(body);
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        });
    }
    ;
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield models_1.default.User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found with id' + id
        });
    }
    yield user.update({ status: false });
    res.json(user);
});
exports.deleteUser = deleteUser;
const newUser = (req, res) => {
    res.send('Form');
};
exports.newUser = newUser;
