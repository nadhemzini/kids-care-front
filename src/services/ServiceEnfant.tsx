import axios, { Axios } from "axios";
import { IEnfant } from '../modals/IEnfant';
const API_BASE_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllEnfant = async () => {
    try {
        const result = await axiosInstance.get(`enfants`);
        console.log(result);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddEnfant = async (formData: FormData) => {
    try {
        await axiosInstance.post('addenfant', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure correct content type for FormData
            }
        });
        console.log('enfant add with success');
    } catch (error: any) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}
export const geteditEnfant = async (id: number) => {
    try {
        const result = await axiosInstance.get(`enfants/${id}`);
        console.log(result.data.data);

        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const posteditEnfant = async (id: number, updatedEnfantData: IEnfant) => {
    try {
        await axiosInstance.put(`updateenfant/${id}`, updatedEnfantData);
        console.log('Update Enfant success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const DeleteEnfant = async (id: number) => {
    try {
        await axiosInstance.delete(`removeenfant/${id}`);
        console.log("Delete Success");
    } catch (err) {
        console.log(err);
    }
};