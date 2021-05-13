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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const time_1 = __importDefault(require("../routes/time"));
const index_1 = __importDefault(require("../routes/index"));
const project_1 = __importDefault(require("../routes/project"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("../db/connection"));
const models_1 = __importDefault(require("../models"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/users',
            times: '/times',
            projects: '/projects'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.engine('.hbs', express_handlebars_1.default({
            extname: '.hbs',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main'
        }));
        this.app.set('view engine', '.hbs');
        this.dbConnection();
        this.middlewares();
        //Define routes
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.times, time_1.default);
        this.app.use(this.apiPaths.projects, project_1.default);
        this.app.use('/index', index_1.default);
    }
    listen() {
        models_1.default.sequelize.sync().then(() => {
            this.app.listen(this.port, () => {
                console.log(`App listening on port ${this.port}`);
            });
        });
    }
}
exports.default = Server;
