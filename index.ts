import dotenv from "dotenv";
import Server from "./config/server";
import db from './models';
import express from 'express';
const app =  express();


// Configuration
dotenv.config();

const server = new Server();
server.listen();

export default server;


// import { users } from "./seeders/users";
// import { projects } from "./seeders/projects";
// import { projectAssignments } from "./seeders/projectAssignments";
// import { times } from "./seeders/times";


// const createProjectAssignments = () => {
//     projectAssignments.map(projectAssignment => {
//         db.ProjectAssignment.create(projectAssignment); 
//     }) 
// }

// createProjectAssignments(); 

// const createTimes = () => {
//     times.map(time => {
//         db.Time.create(time); 
//     }) 
// }

// createTimes(); 

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