import { Request, Response } from "express";
import db from "../models";


export const getProjects = async(req: Request, res: Response) => {

    const { idUser } = req.params;

    const time = await db.Time.findByPk(idUser)

    if(time){
        res.json(time);
    } else {
        res.status(404).json({
            msg: `Not Found user with id ${ idUser }`
        })
    }

}

export const getProject = async(req: Request, res: Response) => {

    const { idUser } = req.params;

    const time = await db.Time.findByPk(idUser)

    if(time){
        res.json(time);
    } else {
        res.status(404).json({
            msg: `Not Found user with id ${ idUser }`
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