import express from 'express';
import { User } from '../models/user.type';
import { userService } from './user.service';

class UserController {
    public async getUser(req: express.Request, res: express.Response) {
        const user: User | undefined = await userService.getUser(req.params.userId);
    
        user
        ? res.json(user)
        : res.status(404).json({message: `User with id ${req.params.userId} is not found`});
    }

    public async deleteUser(req: express.Request, res: express.Response) {
        try{
            await userService.deleteUser(req.params.userId);

            res.json({message: `User with id ${req.params.userId} is marked as deleted`});
        } catch {
            res.status(404).json({message: `User with id ${req.params.userId} is not found`});
        }
    }

    public async updateUser(req: express.Request, res: express.Response) {
        const user: User | undefined = await userService.getUser(req.params.userId);

        if (user) {
            await userService.updateUser(req.body, req.params.userId);
            
            res.json({message: `User id ${req.params.userId} is updated`});
        } else {
            res.status(404).json({message: `User with id ${req.params.userId} is not found`});
        }
    }

    public async createUser(req: express.Request, res: express.Response){
        const user: User = await userService.createUser(req.body);

        res.json({message: `User with id ${user.userId} is created`});
    }

    public async getUserList(req: express.Request, res: express.Response) {
        const userListBySearch = await userService.getUserList(req.query);

        res.json(userListBySearch);
    }
}

export const userController = new UserController();