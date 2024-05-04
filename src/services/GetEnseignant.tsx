import { IEnseignant } from "../modals/IEnseignant";


export const getEnseignantFromLocalStorage = (): IEnseignant | null => {
    const storedUser = localStorage.getItem('enseignant');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    return null;
};