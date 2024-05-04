import axios, { Axios } from "axios";
import { IAdmin } from '../modals/IAdmin';
const API_BASE_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllAdmin = async () => {
    try {
        const result = await axiosInstance.get(`admins`);
        console.log(result);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}