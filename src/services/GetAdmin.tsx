import { IAdmin } from "../modals/IAdmin";


export const getUserFromLocalStorage = (): IAdmin | null => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    return null;
};