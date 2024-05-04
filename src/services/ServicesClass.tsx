import axios, { Axios } from "axios";
import { IClass } from "../modals/IClass";
const API_BASE_URL = "http://127.0.0.1:8000/api/";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllClass = async () => {
    try {
        const result = await axiosInstance.get(`classes`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddClass = async (addclassData: IClass) => {
    try {
        await axiosInstance.post(`addclass`, addclassData);
        console.log('class add with success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const posteditClass = async (id: number, updatedClassData: IClass) => {
    try {
        await axiosInstance.put(`updateclass/${id}`, updatedClassData);
        console.log('Update Class success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const geteditClass = async (id: number) => {
    try {
        const result = await axiosInstance.get(`classes/${id}`);
        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const DeleteClass = async (id: number) => {
    try {
        await axiosInstance.delete(`removeclass/${id}`);
        console.log("Delete Success");
    } catch (err) {
        console.log(err);
    }
};




