import axios, { Axios } from "axios";
import { IMatiere } from "../modals/IMatiere";
const API_BASE_URL = "http://127.0.0.1:8000/api/";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllMatiere = async () => {
    try {
        const result = await axiosInstance.get(`matieres`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddMatiere = async (addMatiereData: IMatiere) => {
    try {
        await axiosInstance.post(`addmatiere`, addMatiereData);
        console.log('matiere add with success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const geteditMatiere = async (id: number) => {
    try {

        const result = await axiosInstance.get(`matieres/${id}`);
        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const posteditMatiere = async (id: number, updatedMatiereData: IMatiere) => {
    try {
        await axiosInstance.put(`updatematiere/${id}`, updatedMatiereData);
        console.log('Update matiere success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const DeleteMatiere = async (id: number) => {
    try {
        await axiosInstance.delete(`removematiere/${id}`);
        console.log("Delete Success");
    } catch (err) {
        console.log(err);
    }
};