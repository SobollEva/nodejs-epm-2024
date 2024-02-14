import { v1 } from 'uuid';
import { User } from '../models/user.type';
import { Op } from 'sequelize';
import UserModel from '../models/user.model';
import dbConnection from '../services/db.service';

class UserService {
    private userBbConnection = UserModel(dbConnection);

    public async getUserList(query): Promise<User[]>{
        const limit: number = isNaN(+query?.limit) ? null : Number(query.limit);
        const loginSubstr = query.search || '';

        return await this.userBbConnection.findAll({
            raw: true,
            order: [['login', 'ASC']],
            where: { login: {[Op.iLike]: `%${loginSubstr}%` }},
            limit
        });
    }

    public async createUser(newUser: User): Promise<User>{
        const user =  {...newUser, userId: v1(newUser), isDeleted: false};

        return await this.userBbConnection
            .create({
                ...user
        });
    }

    public async getUser(userId: string): Promise<User> {
        return await this.userBbConnection.findOne({where: {userId}});
    }

    public async deleteUser(userId: string):Promise<void>{
        
        return await this.userBbConnection
            .update(
                { isDeleted: true },
                {
                    where: {userId}
            })
    }

    public async updateUser(userBody, userId: string): Promise<void>{
        const user = await this.getUser(userId);
        const updatedUser = { ...user};
        const propertyList = ['userId', 'isDeleted', 'login', 'password', 'age'];

        for(const property of propertyList) {
            if (userBody[property]){
                updatedUser[property] = userBody[property];
            }
        }

        return await this.userBbConnection
            .update({...updatedUser}, {
                where: {
                    userId: user.userId
                }
        })
    }
}

export const userService = new UserService();