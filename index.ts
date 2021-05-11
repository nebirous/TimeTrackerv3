import dotenv from "dotenv";
import Server from "./config/server";
import db from './models';
import express from 'express';
const app =  express();


// Configuration
dotenv.config();

const server = new Server();
server.listen(); 



// import { users } from "./seeders/users";
// import { projects } from "./seeders/projects";
// import { projectAssignments } from "./seeders/projectAssignments";

// app.get('/', (req, res) => {
//     db.User.findAll({
//         include: {
//             model: db.Project
//         }
//     }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
// })

// db.sequelize.sync().then(() => {
//     app.listen(port, () => {
//         console.log(`App listening on port ${port}`) 
//     })
// })



// const createProjectAssignments = () => {
//     projectAssignments.map(projectAssignment => {
//         db.ProjectAssignment.create(projectAssignment); 
//     }) 
// }

// createProjectAssignments(); 

// const createUsers = () => {
//     users.map(user => {
//         db.User.create(user);
//     })
// }

// createUsers();

// const createProjects = () => {
//     projects.map(project => {
//          db.Project.create(project);
//      })
//  }

//  createProjects();