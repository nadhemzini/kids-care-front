import axios, { Axios } from "axios";
import { getUserFromLocalStorage } from "./GetAdmin";
import { IHomework } from "../modals/IHomework";

const API_BASE_URL = "http://127.0.0.1:8000/api/";
const userData = getUserFromLocalStorage();


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllHomeworks = async () => {
    try {
        const result = await axiosInstance.get(`homework/${userData?.id}`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddHomework = async (AddHomeworkData: IHomework, selectedClassIds: number[]) => {
    try {
        const response = await axiosInstance.post(`addhomework`, {
            ...AddHomeworkData,
            classes_ids: selectedClassIds
        });
        console.log(response);
        console.log('homework add with success');
    } catch (error: any) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
}