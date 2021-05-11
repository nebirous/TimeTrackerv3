import { Request, Response } from "express";
import db from "../models";


export const getUsers = async(req: Request, res: Response) => {

    db.User.findAll({
        include: {
            model: db.Project
        }
    }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));

    // const users = await db.User.findAll();

    // res.json({users});

}

export const getUser = async(req: Request, res: Response) => {

    const { id } = req.params;

    const user = await db.User.findByPk(id)

    if(user){
        res.json(user);
    } else {
        res.status(404).json({
            msg: `Not Found user with id ${ id }`
        })
    }

}

export const postUser = async(req: Request, res: Response) => {

    const { body } = req;

    try{

        const existeMail = await db.User.findOne({
            where: {
                email: body.email
            }
        });

        if(existeMail){
            return res.status(400).json({
                msg: 'User already exists with email' + body.email
            });
        }


        const user = db.User.build(body);
        await user.save();

        res.json( user );

    }catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        })
    };
    

}

export const putUser = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try{

        const user = await db.User.findByPk(id);

        if(!user){
            return res.status(404).json({
                msg: 'There is no user with id ' + id
            });
        }

        const existeMail = await db.User.findOne({
            where: {
                email: body.email
            }
        });

        if(existeMail){
            return res.status(400).json({
                msg: 'User already exists with email' + body.email
            });
        }else{
            await user.update(body);
        }

        res.json( user );

    }catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator'
        })
    };

}

export const deleteUser = async(req: Request, res: Response) => {

    const { id } = req.params;

    
    const user = await db.User.findByPk(id);
    if(!user){
        return res.status(404).json({
            msg: 'User not found with id' + id
        });
    }

    await user.update({status: false});    

    res.json(user)

}

export const newUser = (req: Request, res: Response) => {

    res.send('Form');

}