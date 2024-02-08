import { User } from '../models/types';

export function sortListByLogin(a: User, b: User) {
    const textA = a.login.toLowerCase();
    const textB = b.login.toLowerCase();

    if (textA > textB) {
        return 1;
    } else if (textA < textB) {
        return -1;
    } else {
        return 0;
    }
}


