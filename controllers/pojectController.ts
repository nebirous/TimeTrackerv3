import { Request, Response } from "express";
import db from "../models";


export const getProjects = async(req: Request, res: Response) => {


    const project = await db.Project.findAll()

    if(project){
        res.json(project);
    } else {
        res.status(404).json({
            msg: `Not Found projects in the DB`
        })
    }

}

export const getProject = async(req: Request, res: Response) => {

    const { id } = req.params;

    const project = await db.Project.findByPk(id)

    if(project){
        res.json(project);
    } else {
        res.status(404).json({
            msg: `Not Found project with id ${ id }`
        })
    }

}

export const postProject = async(req: Request, res: Response) => {

    const { body } = req;

    try{
        
        const project = db.Project.build(body);
        await project.save();

        res.json( project );

    }catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator',
            body
        })
    };
    

}

export const putProject = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try{

        const project = await db.Project.findByPk(id);

        if(!project){
            return res.status(404).json({
                msg: 'There is no project with id ' + id
            });
        }

        await project.update(body);

        res.json( project );

    }catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        })
    };

}

export const deleteProject = async(req: Request, res: Response) => {

    const { id } = req.params;

    
    const project = await db.Project.findByPk(id);
    if(!project){
        return res.status(404).json({
            msg: 'Project not found with id' + id
        });
    }

    await project.update({status: false});    

    res.json(project)

}