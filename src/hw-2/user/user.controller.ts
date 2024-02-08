import express from 'express';
import { User } from '../models/types';
import { userService } from './user.service';

class UserController {
    public async getUser(req: express.Request, res: express.Response) {
        const user: User | undefined = await userService.getUser(req.params.id);
    
            user
            ? res.json(user)
            : res.status(404).json({message: `User with id ${req.params.id} is not found`});
    }

    public async deleteUser(req: express.Request, res: express.Response) {
        if (await userService.isUserExist(req.params.id)) {
            await userService.deleteUser(req.params.id);

            res.json({message: `User with id ${req.params.id} is marked as deleted`})
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
    }

    public async updateUser(req: express.Request, res: express.Response) {
        const user: User | undefined = await userService.getUser(req.params.id);

        if (user) {
            await userService.updateUser(req.body, req.params.id);
            
            res.json({message: `User id ${req.params.id} is updated`});
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
    }

    public async createUser(req: express.Request, res: express.Response){
        const user: User = await userService.createUser(req.body);

        res.json({message: `User with id ${user.id} is created`});
    }

    public async getUserList(req: express.Request, res: express.Response) {
        const userListBySearch = await userService.getUserList(req.query);

        res.json(userListBySearch);
    }
}

export const userController = new UserController();