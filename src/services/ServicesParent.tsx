import axios, { Axios } from "axios";
import { IParent } from '../modals/IParent';
const API_BASE_URL = "http://127.0.0.1:8000/api/";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllParent = async () => {
    try {
        const result = await axiosInstance.get(`parents`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const geteditParents = async (id: number) => {
    try {
        const result = await axiosInstance.get(`parents/${id}`);
        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddParent = async (formData: FormData) => {
    try {
        await axiosInstance.post('addparent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' //Ensure correct content type for FormData
            }
        });
        console.log('parent add with success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const posteditParent = async (id: number, updatedParentData: IParent) => {
    try {
        await axiosInstance.put(`updateparent/${id}`, updatedParentData);
        console.log('Update Parent success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const DeleteParent = async (id: number) => {
    try {
        await axiosInstance.delete(`removeparent/${id}`);
        console.log("Delete Success");
    } catch (err) {
        console.log(err);
    }
};