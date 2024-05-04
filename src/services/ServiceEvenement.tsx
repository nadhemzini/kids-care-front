
import axios, { Axios } from "axios";
import { IEvenement } from "../modals/IEvenement";

const API_BASE_URL = "http://127.0.0.1:8000/api/";



const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllEvenement = async () => {
    try {
        const result = await axiosInstance.get(`evenements`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const geteditEvenement = async (id: number) => {
    try {
        const result = await axiosInstance.get(`evenements/${id}`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddEvenement = async (AddEvenementData: IEvenement) => {
    try {
        await axiosInstance.post(`addevenement`, AddEvenementData);
        console.log('evenement added ')
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const posteditEvenement = async (id: number, UpdateEvenementData: IEvenement) => {
    try {
        await axiosInstance.put(`updateevenement/${id}`, UpdateEvenementData);
        console.log('evenement updated ')
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

