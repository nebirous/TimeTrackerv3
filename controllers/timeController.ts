import { Request, Response } from "express";
import db from "../models";


/** Gets times from a id user */
export const getTimes = async(req: Request, res: Response) => {

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

export const postTime = async(req: Request, res: Response) => {

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

export const putTime = async(req: Request, res: Response) => {

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

export const deleteTime = async(req: Request, res: Response) => {

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