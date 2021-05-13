import { Request, Response } from "express";
import sequelize from "sequelize";
import { Op } from 'sequelize';
import db from "../models";


/** Gets times from a id user */
export const getTimes = async(req: Request, res: Response) => {

    const { id } = req.params;
    const projectId = req.query.projectId;
    const day = req.query.day?.toString();

    const dateTime = day?.concat("T00:00:00.000Z");

    const whereClause: any = {};
    console.log(dateTime);

    if(dateTime){
        whereClause.day= dateTime;
    }
    if(projectId){
        whereClause.projectId = projectId;
    }

    const times = await db.Time.findAll({
        where: whereClause
    })

    console.log(day);

    if(times){
        res.json(times);
    } else {
        res.status(404).json({
            msg: `Not Found times for user with id ${ id }`
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