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

    const time = await db.Time.findByPk(id)

    if(time){
        res.json(time);
    } else {
        res.status(404).json({
            msg: `Not Found project with id ${ id }`
        })
    }

}

export const postProject = async(req: Request, res: Response) => {

    const { body } = req;

    try{
        
        const time = db.Time.build(body);
        await time.save();

        res.json( time );

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

        const time = await db.Time.findByPk(id);

        if(!time){
            return res.status(404).json({
                msg: 'There is no user with id ' + id
            });
        }

        await time.update(body);

        res.json( time );

    }catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        })
    };

}

export const deleteProject = async(req: Request, res: Response) => {

    const { id } = req.params;

    
    const time = await db.Time.findByPk(id);
    if(!time){
        return res.status(404).json({
            msg: 'Time not found with id' + id
        });
    }

    await time.update({status: false});    

    res.json(time)

}