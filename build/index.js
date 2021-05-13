"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./config/server"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// Configuration
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
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
