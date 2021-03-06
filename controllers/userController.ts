import { Request, Response } from "express";
import db from "../models";


export const getUsers = async(req: Request, res: Response) => {

    db.User.findAll({
        include: [{
            model: db.Project,
            as: "projects"
        },{
            model: db.Time,
            as: "time"
        }]
    }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));

    // const users = await db.User.findAll();

    // res.json({users});

}

export const getUser = async(req: Request, res: Response) => {

    const { id } = req.params;

    const user = await db.User.findByPk(id);

    if(user){
        res.status(200).json(user);
    } else {
        res.status(404).json({
            msg: `Not Found user with id ${ id }`
        })
    }

}

export const login = async(req: Request, res: Response) => {
    const username = req.query.user;
    const password = req.query.password;

    const login = await db.User.findOne({
        where: {
            name: username,
            password: password
        }
    })

    if(login){
        res.status(200).json(login)
    }else{
        res.status(404).json({msg: "Wrong user credentials"})
    }

}

export const postUser = async(req: Request, res: Response) => {

    const { body } = req;
    console.log(body);

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
        console.log(existeMail);
        console.log("Body: "+body);

        const user = db.User.build(body);

        await user.save();

        res.json( user );

    }catch (error) {
        res.status(500).json({
            msg: 'Error. Talk to administrator',
            error
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

    await user.destroy({
        where: {
            id: id
        }
    });    

    res.json(user)

}

export const newUser = (req: Request, res: Response) => {

    res.status(200).json({ msg: 'works!'})

}