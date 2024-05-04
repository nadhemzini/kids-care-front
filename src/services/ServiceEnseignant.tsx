import axios, { Axios } from "axios";
import { IEnseignant } from '../modals/IEnseignant';
const API_BASE_URL = "http://127.0.0.1:8000/api/";


console.log(localStorage.getItem('token'))

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllEnseignant = async () => {
    try {
        const result = await axiosInstance.get(`enseignants`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const geteditEnseignants = async (id: number) => {
    try {

        const result = await axiosInstance.get(`enseignants/${id}`);
        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const addEnseignant = async (formData: FormData) => {
    try {
        await axiosInstance.post('addenseignant', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure correct content type for FormData
            }
        });
        console.log('post add with success');
    } catch (error: any) {
        console.log((error.response.data.message))
        throw new Error(error.response.data.message);
    }
}