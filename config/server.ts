import express from "express";
import userRoutes from "../routes/user";
import timesRoutes from "../routes/time";
import indexRoutes from "../routes/index";
import projectRoutes from "../routes/project";
import exphbs from 'express-handlebars';
import cors from "cors";
import path from "path";

import connection from "../db/connection";
import db from '../models';

class Server {

    public app: express.Application;
    private port: string;
    private apiPaths = {
        users: '/users',
        times: '/times',
        projects: '/projects'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT  || '8000';
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.engine('.hbs', exphbs({
            extname: '.hbs',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main'
        }));
        this.app.set('view engine', '.hbs')

        this.dbConnection();
        this.middlewares();

        //Define routes
        this.routes();

    }
    
    async dbConnection(){
        try{
            await connection.authenticate();
            console.log('Database online');
        }catch (error){
            throw new Error(error)
        }
    }

    middlewares(){

        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());
        
        // Public
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.times, timesRoutes);
        this.app.use(this.apiPaths.projects, projectRoutes);
        this.app.use('/index', indexRoutes);
    }

    listen(){
        db.sequelize.sync().then(() => {
                this.app.listen(this.port, () => {
                    console.log(`App listening on port ${this.port}`) 
                })
            })
    }

    

}

export default Server