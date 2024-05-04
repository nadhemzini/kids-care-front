import axios, { Axios } from "axios";
import { IAdmin } from '../modals/IAdmin';
const API_BASE_URL = "http://127.0.0.1:8000/api/";


console.log(localStorage.getItem('token'))

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const geteditAdmin = async (id: number) => {
    try {

        const result = await axiosInstance.get(`admins/${id}`);
        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const posteditAdmin = async (id: number, updatedAdminData: IAdmin) => {
    try {
        await axiosInstance.put(`updateadmin/${id}`, updatedAdminData);
        console.log('Update admin success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddAdmin = async (formData: FormData) => {
    try {
        await axiosInstance.post('addadmin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure correct content type for FormData
            }
        });
        console.log('admin add with success');
    } catch (error: any) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}
export const login = async (email: string, password: string, selectedOption: string) => {
    try {
        const response = await axiosInstance.post(`login-${selectedOption}`, { email, password });
        console.log('login admin');
        localStorage.setItem('token', response.data.token);
        if (selectedOption == "admin") {
            const admindata = response.data.admin;
            localStorage.setItem('user', JSON.stringify(admindata));
        } else if (selectedOption == "enseignant") {
            const enseignantdata = response.data.enseignant;
            console.log(enseignantdata);
            localStorage.setItem('user', JSON.stringify(enseignantdata));
        }
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
