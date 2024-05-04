
import axios, { Axios } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";


console.log(localStorage.getItem('token'))

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllReclamations = async () => {
    try {
        const result = await axiosInstance.get(`reclamations`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const updateReclamation = async (id: number, response: string) => {
    try {
        await axiosInstance.put(`updatereclamation/${id}`, response);

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}