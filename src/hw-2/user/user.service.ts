import { v1 } from 'uuid';
import { User } from '../models/types';
import { sortListByLogin } from '../services/utils';

class UserService {
    private _userList: User[] = [];

    public async getUserList(query): Promise<User[]>{
        const limit: number = isNaN(+query?.limit) ? 0 : Number(query.limit);
        const loginSubstr = query.search || '';
        const userListBySearch = this._getAutoSuggestUserList(loginSubstr as string, limit);
        
        return userListBySearch;
    }

    public async createUser(newUser: User): Promise<User>{
        const user =  {...newUser, id: v1(newUser), isDeleted: false};

        this._userList.push(user);

        return user;
    }

    public async getUser(userId: string): Promise<User> {
        return this._userList.find((item: User) => item.id === userId);
    }

    public async deleteUser(userId: string):Promise<void>{
        const user = await this.getUser(userId);
        user.isDeleted = true;
    }

    public async updateUser(userBody, userId: string): Promise<void>{
        const user = await this.getUser(userId);
        const propertyList = ['id', 'isDeleted', 'login', 'password', 'age'];

        for(const property of propertyList) {
            if (userBody[property]){
                user[property] = userBody[property];
            }
        }
    }

    public async isUserExist(userId: string): Promise<boolean>{
        const user = await this.getUser(userId);
        return user && !user.isDeleted;
    }

    private _getAutoSuggestUserList(loginSubstring: string, limit: number): User[] {
        const userList = this._userList
            .sort(sortListByLogin)
            .filter((user: User) => user.login.includes(loginSubstring));

        return limit
            ? userList.splice(0, limit)
            : userList;
    }
}

export const userService = new UserService();